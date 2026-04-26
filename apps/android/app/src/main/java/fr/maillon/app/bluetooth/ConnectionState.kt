package fr.maillon.app.bluetooth

/**
 * État de connexion BLE — aligné sur apps/common/contracts/ConnectionState.md (v1).
 * Les 8 cas sont partagés à l'identique entre iOS, Android et Tauri.
 * Ne pas modifier sans bumper la version du contrat.
 */
sealed class ConnectionState {

    data object Idle : ConnectionState()

    data object Unauthorized : ConnectionState()

    data object Unsupported : ConnectionState()

    data object Scanning : ConnectionState()

    data class Connecting(val nodeNum: UInt) : ConnectionState()

    data class Connected(val nodeNum: UInt) : ConnectionState()

    data object Disconnecting : ConnectionState()

    data class Error(val reason: String, val recoverable: Boolean) : ConnectionState()

    val isConnected: Boolean
        get() = this is Connected

    val label: String
        get() = when (this) {
            is Idle -> "Prêt"
            is Unauthorized -> "Bluetooth non autorisé"
            is Unsupported -> "Bluetooth indisponible"
            is Scanning -> "Recherche en cours…"
            is Connecting -> "Connexion au nœud $nodeNum…"
            is Connected -> "Connecté au nœud $nodeNum"
            is Disconnecting -> "Déconnexion…"
            is Error -> "Erreur : $reason"
        }
}
