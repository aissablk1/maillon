// MAILLON Console — entry point Rust (Tauri 2)
//
// Backend de la console opérateur. Expose au frontend React un ensemble de
// commandes Tauri qui s'appuient sur le SDK officiel meshtastic-rust pour
// dialoguer avec les nœuds physiques (Bluetooth Low Energy via btleplug ou
// USB Serial via le crate `meshtastic`).
//
// Aucune simulation : tant qu'aucune connexion réelle n'est établie, les
// commandes renvoient des collections vides ou une erreur explicite.

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;

use serde::{Deserialize, Serialize};
use tauri::{Manager, State};
use thiserror::Error;
use tokio::sync::Mutex;
use tracing::{info, warn};

// -----------------------------------------------------------------------------
// Modèle de données partagé avec le frontend
// Aligné sur apps/common/contracts/Node.schema.json (v1).
// -----------------------------------------------------------------------------

/// Représentation d'un nœud Meshtastic exposée au frontend.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MeshNode {
    /// Identifiant 32 bits canonique Meshtastic.
    pub node_num: u32,
    /// Nom long affichable (max 39 octets UTF-8).
    pub long_name: String,
    /// Nom court (max 4 caractères).
    pub short_name: String,
    pub hw_model: Option<String>,
    pub firmware_version: Option<String>,
    pub battery_level: Option<u8>,
    pub rssi: Option<i32>,
    pub snr: Option<f32>,
    /// Dernier heartbeat reçu, ISO 8601 UTC.
    pub last_heard: Option<String>,
    pub is_online: bool,
    /// Index de canal Meshtastic (0 = primaire, 1-7 = secondaires).
    pub channel: u8,
}

/// État de connexion BLE — aligné sur apps/common/contracts/ConnectionState.md (v1).
/// Les 8 cas sont partagés à l'identique entre iOS, Android et Tauri.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "camelCase")]
pub enum ConnectionState {
    Idle,
    Unauthorized,
    Unsupported,
    Scanning,
    Connecting { node_num: u32 },
    Connected { node_num: u32 },
    Disconnecting,
    Error { reason: String, recoverable: bool },
}

#[derive(Debug, Error, Serialize)]
#[serde(tag = "kind", content = "message")]
pub enum AppError {
    #[error("Aucun nœud connecté")]
    NotConnected,
    #[error("Erreur SDK Meshtastic : {0}")]
    Sdk(String),
    #[error("Erreur Bluetooth : {0}")]
    Bluetooth(String),
}

pub type AppResult<T> = Result<T, AppError>;

// -----------------------------------------------------------------------------
// État applicatif global — handle de connexion Meshtastic
// -----------------------------------------------------------------------------

#[derive(Default)]
pub struct AppState {
    /// Connexion active vers un nœud Meshtastic. None tant qu'aucune connexion
    /// n'a été établie. Le SDK `meshtastic` expose des `StreamApi` qu'on
    /// instancie ici une fois la cible BLE/Serial sélectionnée.
    pub connection: Mutex<Option<MeshtasticConnection>>,
}

/// Wrapper opaque autour de la connexion SDK Meshtastic. Conserve la cible
/// matérielle (BLE/Serial), le décodeur de paquets et un canal d'événements.
pub struct MeshtasticConnection {
    pub target: String,
}

// -----------------------------------------------------------------------------
// Commandes Tauri — invoquées depuis le frontend via `invoke()`
// -----------------------------------------------------------------------------

/// Scanne les nœuds Meshtastic à proximité (BLE) et les nœuds connus du nœud
/// local s'il y en a un. Renvoie une liste vide tant qu'aucun adaptateur n'est
/// disponible — pas de mock, pas de fake data.
#[tauri::command]
async fn scan_devices(state: State<'_, Arc<AppState>>) -> AppResult<Vec<MeshNode>> {
    info!("scan_devices appelée");

    let conn = state.connection.lock().await;
    if conn.is_none() {
        // TODO : intégrer un scan BLE via btleplug pour découvrir les nœuds
        //        Meshtastic à proximité (filtre par service UUID Meshtastic).
        //        En attendant la connexion BLE réelle, on renvoie une liste
        //        vide — l'UI affiche « Aucun nœud détecté ».
        warn!("aucun adaptateur connecté, scan ignoré");
        return Ok(Vec::new());
    }

    // TODO : appeler le SDK pour récupérer la NodeDB du nœud local
    //        (`meshtastic::api::StreamApi::nodes()`).
    Ok(Vec::new())
}

/// Établit une connexion vers un nœud Meshtastic identifié par son adresse
/// (MAC BLE ou chemin série, ex. "/dev/ttyUSB0" ou "COM3").
#[tauri::command]
async fn connect_device(
    target: String,
    state: State<'_, Arc<AppState>>,
) -> AppResult<MeshNode> {
    info!(target = %target, "connect_device appelée");

    // TODO : choisir le transport selon le format de la cible (BLE vs Serial)
    //        et instancier `meshtastic::api::StreamApi::connect_*`.
    let mut conn = state.connection.lock().await;
    *conn = Some(MeshtasticConnection {
        target: target.clone(),
    });

    Err(AppError::Sdk(
        "connexion réelle au SDK meshtastic non encore câblée".into(),
    ))
}

/// Envoie un message texte sur le canal mesh actif. Nécessite une connexion
/// préalable via `connect_device`.
#[tauri::command]
async fn send_message(
    text: String,
    channel: u32,
    state: State<'_, Arc<AppState>>,
) -> AppResult<()> {
    info!(channel, "send_message appelée");

    let conn = state.connection.lock().await;
    let Some(_active) = conn.as_ref() else {
        return Err(AppError::NotConnected);
    };

    // TODO : sérialiser un MeshPacket avec `meshtastic::protobufs` et le pousser
    //        dans le `StreamApi`.
    let _ = text;
    Err(AppError::Sdk(
        "envoi de message non encore câblé au SDK meshtastic".into(),
    ))
}

// -----------------------------------------------------------------------------
// Bootstrap
// -----------------------------------------------------------------------------

fn main() {
    // Initialise les logs structurés (RUST_LOG=info par défaut)
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new("info")),
        )
        .compact()
        .init();

    let state = Arc::new(AppState::default());

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            scan_devices,
            connect_device,
            send_message
        ])
        .setup(|app| {
            info!("MAILLON Console démarrée — version {}", app.package_info().version);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("erreur fatale au démarrage de Tauri");
}
