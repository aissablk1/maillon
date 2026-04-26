package fr.maillon.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import fr.maillon.app.ui.theme.MaillonColors
import fr.maillon.app.ui.theme.MaillonTheme

// L'état de connexion canonique (8 cas) est défini dans
// fr.maillon.app.bluetooth.ConnectionState — partagé entre iOS, Android, Tauri
// via apps/common/contracts/ConnectionState.md (v1).

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    onConnectNodeClick: () -> Unit
) {
    // Squelette : statut hardcodé Idle. À câbler sur le vrai repo BLE
    // qui exposera un StateFlow<ConnectionState>.
    val status by remember {
        mutableStateOf<fr.maillon.app.bluetooth.ConnectionState>(
            fr.maillon.app.bluetooth.ConnectionState.Idle
        )
    }

    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = { MaillonBrandTitle() },
                colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary
                )
            )
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { padding ->
        HomeContent(
            padding = padding,
            status = status,
            onConnectNodeClick = onConnectNodeClick
        )
    }
}

@Composable
private fun MaillonBrandTitle() {
    Row(verticalAlignment = Alignment.CenterVertically) {
        // Pastille brand — placeholder du logo, sera remplacée par un vector drawable.
        Box(
            modifier = Modifier
                .size(10.dp)
                .background(MaillonColors.Signal, CircleShape)
        )
        Spacer(Modifier.width(10.dp))
        Text(
            text = "MAILLON",
            style = MaterialTheme.typography.titleLarge.copy(
                fontWeight = FontWeight.Bold,
                letterSpacing = 2.sp
            )
        )
    }
}

@Composable
private fun HomeContent(
    padding: PaddingValues,
    status: BleStatus,
    onConnectNodeClick: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(padding)
            .padding(horizontal = 24.dp, vertical = 32.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        Text(
            text = "Réseau mesh souverain",
            style = MaterialTheme.typography.headlineLarge,
            color = MaterialTheme.colorScheme.onBackground
        )
        Text(
            text = "Connectez votre nœud Meshtastic pour rejoindre le maillage MAILLON et communiquer hors couverture cellulaire : champ, montagne, tunnel, crise.",
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.78f)
        )

        Spacer(Modifier.height(8.dp))

        StatusCard(status = status)

        Spacer(Modifier.height(8.dp))

        Button(
            onClick = onConnectNodeClick,
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = MaillonColors.Signal,
                contentColor = MaillonColors.Charcoal
            )
        ) {
            // Espace insécable + chevron typographique français (U+203A)
            Text(
                text = "Connecter un nœud ›",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.SemiBold)
            )
        }

        Spacer(Modifier.height(4.dp))

        Text(
            text = "Compatible Heltec V3, T-Beam, RAK4631 — firmware Meshtastic ≥ 2.3",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.55f)
        )
    }
}

@Composable
private fun StatusCard(status: fr.maillon.app.bluetooth.ConnectionState) {
    val (label, dot) = when (status) {
        is fr.maillon.app.bluetooth.ConnectionState.Idle ->
            "Aucun nœud connecté" to MaillonColors.Charcoal.copy(alpha = 0.4f)
        is fr.maillon.app.bluetooth.ConnectionState.Scanning ->
            "Recherche en cours…" to MaillonColors.Cobalt
        is fr.maillon.app.bluetooth.ConnectionState.Connecting ->
            "Connexion en cours…" to MaillonColors.Cobalt
        is fr.maillon.app.bluetooth.ConnectionState.Connected ->
            "Nœud ${status.nodeNum} connecté" to MaillonColors.Moss
        is fr.maillon.app.bluetooth.ConnectionState.Disconnecting ->
            "Déconnexion…" to MaillonColors.Charcoal.copy(alpha = 0.4f)
        is fr.maillon.app.bluetooth.ConnectionState.Unauthorized ->
            "Bluetooth non autorisé" to MaillonColors.Danger
        is fr.maillon.app.bluetooth.ConnectionState.Unsupported ->
            "Bluetooth indisponible" to MaillonColors.Danger
        is fr.maillon.app.bluetooth.ConnectionState.Error ->
            "Erreur : ${status.reason}" to MaillonColors.Danger
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant,
            contentColor = MaterialTheme.colorScheme.onSurfaceVariant
        )
    ) {
        Row(
            modifier = Modifier.padding(20.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(12.dp)
                    .background(dot, CircleShape)
            )
            Column {
                Text(
                    text = "Statut Bluetooth",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f)
                )
                Text(
                    text = label,
                    style = MaterialTheme.typography.titleMedium
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun HomeScreenPreview() {
    MaillonTheme {
        HomeScreen(onConnectNodeClick = {})
    }
}
