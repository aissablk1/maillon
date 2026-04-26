package fr.maillon.app.ui.screens

import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanResult
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import fr.maillon.app.ui.theme.MaillonColors
import fr.maillon.app.ui.theme.MaillonTheme
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

/**
 * Modèle d'un nœud Meshtastic découvert via BLE.
 *
 * Quand le SDK officiel sera branché, ce modèle sera remplacé par
 * `com.geeksville.mesh.NodeInfo` exposé par `IMeshService`.
 */
data class MeshNode(
    val address: String,
    val name: String,
    val rssi: Int
)

data class MeshMessage(
    val from: String,
    val text: String,
    val timestamp: Long
)

data class DeviceListUiState(
    val isScanning: Boolean = false,
    val nodes: List<MeshNode> = emptyList(),
    val connectedNodeAddress: String? = null,
    val messages: List<MeshMessage> = emptyList(),
    val errorMessage: String? = null
)

/**
 * ViewModel — détient l'état UI et les actions.
 *
 * Pour ce squelette, le scan BLE utilise directement `BluetoothLeScanner` d'Android.
 * En production, il faut le remplacer par le binding au service Meshtastic officiel
 * qui expose un flux de NodeInfo via AIDL — voir Meshtastic-Android/IMeshService.aidl.
 */
class DeviceListViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(DeviceListUiState())
    val uiState: StateFlow<DeviceListUiState> = _uiState.asStateFlow()

    private var scanner: android.bluetooth.le.BluetoothLeScanner? = null
    private val scanCallback = object : ScanCallback() {
        override fun onScanResult(callbackType: Int, result: ScanResult) {
            val device = result.device ?: return
            // Le SDK Meshtastic expose un service UUID dédié — à filtrer ici en prod.
            val node = MeshNode(
                address = device.address ?: return,
                name = device.name ?: "Nœud Meshtastic",
                rssi = result.rssi
            )
            _uiState.update { state ->
                if (state.nodes.any { it.address == node.address }) state
                else state.copy(nodes = state.nodes + node)
            }
        }

        override fun onScanFailed(errorCode: Int) {
            _uiState.update { it.copy(isScanning = false, errorMessage = "Échec du scan : code $errorCode") }
        }
    }

    fun startScan(context: Context) {
        val manager = context.getSystemService(Context.BLUETOOTH_SERVICE) as? BluetoothManager
        val adapter: BluetoothAdapter? = manager?.adapter
        if (adapter == null || !adapter.isEnabled) {
            _uiState.update { it.copy(errorMessage = "Bluetooth désactivé") }
            return
        }
        scanner = adapter.bluetoothLeScanner
        _uiState.update { it.copy(isScanning = true, nodes = emptyList(), errorMessage = null) }
        try {
            scanner?.startScan(scanCallback)
        } catch (se: SecurityException) {
            _uiState.update { it.copy(isScanning = false, errorMessage = "Permission BLE manquante") }
        }
    }

    fun stopScan() {
        try {
            scanner?.stopScan(scanCallback)
        } catch (_: SecurityException) {
            // ignoré — état nettoyé ci-dessous
        }
        _uiState.update { it.copy(isScanning = false) }
    }

    fun selectNode(node: MeshNode) {
        _uiState.update { it.copy(connectedNodeAddress = node.address) }
        // En production : binding au service Meshtastic + abonnement au flux de messages.
    }

    fun sendMessage(text: String) {
        if (text.isBlank()) return
        // Optimistic update — le SDK officiel renverra une confirmation.
        val msg = MeshMessage(from = "moi", text = text.trim(), timestamp = System.currentTimeMillis())
        _uiState.update { it.copy(messages = it.messages + msg) }
    }

    override fun onCleared() {
        super.onCleared()
        stopScan()
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DeviceListScreen(
    onBackClick: () -> Unit,
    viewModel: DeviceListViewModel = viewModel()
) {
    val context = LocalContext.current
    val uiState by viewModel.uiState.collectAsState()

    val requiredPermissions = remember {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            arrayOf(Manifest.permission.BLUETOOTH_SCAN, Manifest.permission.BLUETOOTH_CONNECT)
        } else {
            arrayOf(Manifest.permission.ACCESS_FINE_LOCATION)
        }
    }

    val permissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestMultiplePermissions()
    ) { granted ->
        if (granted.values.all { it }) viewModel.startScan(context)
    }

    LaunchedEffect(Unit) {
        val allGranted = requiredPermissions.all {
            ContextCompat.checkSelfPermission(context, it) == PackageManager.PERMISSION_GRANTED
        }
        if (allGranted) viewModel.startScan(context) else permissionLauncher.launch(requiredPermissions)
    }

    DisposableEffect(Unit) { onDispose { viewModel.stopScan() } }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Nœuds à proximité") },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Retour")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary,
                    navigationIconContentColor = MaterialTheme.colorScheme.onPrimary
                )
            )
        },
        containerColor = MaterialTheme.colorScheme.background
    ) { padding ->
        DeviceListContent(
            padding = padding,
            state = uiState,
            onNodeClick = viewModel::selectNode,
            onSendMessage = viewModel::sendMessage
        )
    }
}

@Composable
private fun DeviceListContent(
    padding: PaddingValues,
    state: DeviceListUiState,
    onNodeClick: (MeshNode) -> Unit,
    onSendMessage: (String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(padding)
    ) {
        if (state.connectedNodeAddress == null) {
            ScanList(state = state, onNodeClick = onNodeClick)
        } else {
            MessagesPane(
                state = state,
                onSendMessage = onSendMessage
            )
        }
    }
}

@Composable
private fun ScanList(
    state: DeviceListUiState,
    onNodeClick: (MeshNode) -> Unit
) {
    Column(modifier = Modifier.fillMaxSize().padding(horizontal = 24.dp, vertical = 16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            val dot = if (state.isScanning) MaillonColors.Cobalt else MaillonColors.Charcoal.copy(alpha = 0.4f)
            Box(
                Modifier
                    .size(10.dp)
                    .background(dot, CircleShape)
            )
            Spacer(Modifier.size(10.dp))
            Text(
                text = if (state.isScanning) "Recherche en cours…" else "Scan inactif",
                style = MaterialTheme.typography.labelLarge,
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.7f)
            )
        }
        Spacer(Modifier.height(16.dp))

        if (state.errorMessage != null) {
            Text(
                text = state.errorMessage,
                style = MaterialTheme.typography.bodyMedium,
                color = MaillonColors.Danger
            )
            Spacer(Modifier.height(12.dp))
        }

        if (state.nodes.isEmpty() && !state.isScanning) {
            EmptyHint()
        } else {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                items(state.nodes, key = { it.address }) { node ->
                    NodeRow(node = node, onClick = { onNodeClick(node) })
                }
            }
        }
    }
}

@Composable
private fun EmptyHint() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant
        )
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Text(
                text = "Aucun nœud détecté",
                style = MaterialTheme.typography.titleMedium
            )
            Spacer(Modifier.height(6.dp))
            Text(
                text = "Vérifiez que votre nœud Meshtastic est allumé, à portée et en mode appairage. Le scan reprend automatiquement.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.75f)
            )
        }
    }
}

@Composable
private fun NodeRow(node: MeshNode, onClick: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface,
            contentColor = MaterialTheme.colorScheme.onSurface
        ),
        onClick = onClick
    ) {
        Row(
            modifier = Modifier.padding(16.dp).fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(text = node.name, style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(2.dp))
                Text(
                    text = node.address,
                    style = MaterialTheme.typography.bodyMedium.copy(fontFamily = FontFamily.Monospace),
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
                )
            }
            Text(
                text = "${node.rssi} dBm",
                style = MaterialTheme.typography.labelLarge,
                color = MaillonColors.Moss
            )
            Spacer(Modifier.size(12.dp))
            Text(
                text = "›",
                style = MaterialTheme.typography.titleLarge,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f)
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun MessagesPane(
    state: DeviceListUiState,
    onSendMessage: (String) -> Unit
) {
    var draft by remember { mutableStateOf("") }

    Column(modifier = Modifier.fillMaxSize()) {
        // Bandeau nœud connecté
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant)
                .padding(horizontal = 24.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                Modifier
                    .size(10.dp)
                    .background(MaillonColors.Moss, CircleShape)
            )
            Spacer(Modifier.size(10.dp))
            Text(
                text = "Connecté à ${state.connectedNodeAddress}",
                style = MaterialTheme.typography.labelLarge,
                fontFamily = FontFamily.Monospace
            )
        }

        // Liste de messages
        LazyColumn(
            modifier = Modifier.weight(1f).padding(horizontal = 24.dp, vertical = 16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            if (state.messages.isEmpty()) {
                items(listOf("hint")) {
                    Text(
                        text = "Aucun message reçu sur le canal par défaut. Envoyez le premier !",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.55f)
                    )
                }
            } else {
                items(state.messages, key = { it.timestamp }) { msg ->
                    MessageBubble(msg)
                }
            }
        }

        HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))

        // Composer
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            OutlinedTextField(
                value = draft,
                onValueChange = { draft = it },
                modifier = Modifier.weight(1f),
                placeholder = { Text("Message…") },
                singleLine = false,
                maxLines = 4,
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = MaterialTheme.colorScheme.primary,
                    unfocusedBorderColor = MaterialTheme.colorScheme.outline
                )
            )
            IconButton(
                onClick = {
                    onSendMessage(draft)
                    draft = ""
                },
                modifier = Modifier
                    .size(48.dp)
                    .background(MaillonColors.Signal, RoundedCornerShape(12.dp))
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.Send,
                    contentDescription = "Envoyer",
                    tint = MaillonColors.Charcoal
                )
            }
        }
    }
}

@Composable
private fun MessageBubble(msg: MeshMessage) {
    Card(
        shape = RoundedCornerShape(10.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(
                text = msg.from,
                style = MaterialTheme.typography.labelSmall,
                color = MaillonColors.Moss
            )
            Spacer(Modifier.height(2.dp))
            Text(text = msg.text, style = MaterialTheme.typography.bodyLarge)
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun DeviceListPreview() {
    MaillonTheme {
        DeviceListScreen(onBackClick = {})
    }
}
