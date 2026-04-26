package fr.maillon.app

import android.app.Application
import android.util.Log

/**
 * Classe Application racine.
 *
 * Point d'entrée pour l'initialisation globale (logging, crash reporting, SDK Meshtastic).
 * Volontairement minimale dans ce squelette — pas de Hilt pour rester lisible.
 */
class MaillonApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        Log.i(TAG, "MAILLON démarrée — version ${BuildConfig.VERSION_NAME}")

        // À brancher dans Phase 1 :
        // - Initialisation du service Meshtastic (binding au com.geeksville.mesh.IMeshService)
        // - Crash reporting (Sentry / Bugsnag)
        // - Configuration des canaux de notification (SOS, alerte batterie)
    }

    companion object {
        private const val TAG = "MaillonApp"
    }
}
