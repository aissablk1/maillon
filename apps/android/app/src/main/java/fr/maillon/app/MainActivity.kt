package fr.maillon.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import fr.maillon.app.ui.screens.DeviceListScreen
import fr.maillon.app.ui.screens.HomeScreen
import fr.maillon.app.ui.theme.MaillonTheme

/**
 * Activity unique — pattern single-activity Compose.
 *
 * La navigation est gérée en mémoire via une sealed class [Route].
 * On introduira `androidx.navigation:navigation-compose` quand on dépassera 3 écrans.
 */
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MaillonTheme {
                MaillonApp()
            }
        }
    }
}

private sealed interface Route {
    data object Home : Route
    data object DeviceList : Route
}

@Composable
private fun MaillonApp() {
    var route by remember { mutableStateOf<Route>(Route.Home) }

    when (route) {
        Route.Home -> HomeScreen(
            onConnectNodeClick = { route = Route.DeviceList }
        )
        Route.DeviceList -> DeviceListScreen(
            onBackClick = { route = Route.Home }
        )
    }
}
