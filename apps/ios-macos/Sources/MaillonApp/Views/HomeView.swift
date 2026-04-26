// MAILLON — écran d'accueil : logo, statut connexion BLE, bouton de connexion

import SwiftUI

struct HomeView: View {
    @Environment(MaillonBluetoothManager.self) private var bluetooth
    @State private var showingDeviceList = false

    var body: some View {
        ZStack {
            MaillonTheme.Colors.background.ignoresSafeArea()

            ScrollView {
                VStack(spacing: MaillonTheme.Spacing.xl) {
                    brandHeader
                    statusCard
                    primaryAction
                    infoFooter
                }
                .padding(.horizontal, MaillonTheme.Spacing.lg)
                .padding(.vertical, MaillonTheme.Spacing.xl)
                .frame(maxWidth: 720)
                .frame(maxWidth: .infinity)
            }
        }
        .navigationTitle("MAILLON")
        #if os(iOS)
        .navigationBarTitleDisplayMode(.inline)
        #endif
        .sheet(isPresented: $showingDeviceList) {
            NavigationStack {
                DeviceListView()
            }
        }
    }

    // MARK: - Sections

    private var brandHeader: some View {
        VStack(spacing: MaillonTheme.Spacing.md) {
            // Marque MAILLON — placeholder logo, à remplacer par asset SVG/PNG
            ZStack {
                Circle()
                    .fill(MaillonTheme.Colors.forest)
                    .frame(width: 96, height: 96)
                Image(systemName: "antenna.radiowaves.left.and.right")
                    .font(.system(size: 44, weight: .semibold))
                    .foregroundStyle(MaillonTheme.Colors.signal)
            }
            .overlay(
                Circle().stroke(MaillonTheme.Colors.moss, lineWidth: 2)
            )

            Text("MAILLON")
                .font(MaillonTheme.Typography.display)
                .foregroundStyle(MaillonTheme.Colors.sand)
                .tracking(4)

            Text("Réseau mesh radio souverain")
                .font(MaillonTheme.Typography.bodyLg)
                .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
        }
        .padding(.top, MaillonTheme.Spacing.lg)
    }

    private var statusCard: some View {
        HStack(spacing: MaillonTheme.Spacing.md) {
            statusDot
            VStack(alignment: .leading, spacing: 2) {
                Text("Statut Bluetooth")
                    .font(MaillonTheme.Typography.caption)
                    .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
                Text(bluetooth.connectionState.label)
                    .font(MaillonTheme.Typography.bodyLg)
                    .foregroundStyle(MaillonTheme.Colors.sand)
            }
            Spacer()
        }
        .maillonCard()
    }

    private var statusDot: some View {
        Circle()
            .fill(statusColor)
            .frame(width: 12, height: 12)
            .overlay(
                Circle().stroke(statusColor.opacity(0.4), lineWidth: 6)
            )
    }

    private var statusColor: Color {
        switch bluetooth.connectionState {
        case .connected:                            return MaillonTheme.Colors.moss
        case .scanning, .connecting, .disconnecting: return MaillonTheme.Colors.signal
        case .unauthorized, .unsupported, .error:   return MaillonTheme.Colors.danger
        case .idle:                                 return MaillonTheme.Colors.onSurfaceMuted
        }
    }

    private var primaryAction: some View {
        Button {
            showingDeviceList = true
        } label: {
            HStack(spacing: MaillonTheme.Spacing.sm) {
                Image(systemName: "dot.radiowaves.left.and.right")
                Text(bluetooth.connectionState.isConnected ? "Gérer le nœud connecté" : "Connecter un nœud")
                    .font(MaillonTheme.Typography.bodyLg.weight(.semibold))
                Text("\u{00A0}\u{203A}")
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, MaillonTheme.Spacing.lg)
            .background(MaillonTheme.Colors.signal)
            .foregroundStyle(MaillonTheme.Colors.charcoal)
            .clipShape(RoundedRectangle(cornerRadius: MaillonTheme.Radius.lg, style: .continuous))
        }
        .buttonStyle(.plain)
    }

    private var infoFooter: some View {
        VStack(alignment: .leading, spacing: MaillonTheme.Spacing.sm) {
            Text("À propos de MAILLON")
                .font(MaillonTheme.Typography.h3)
                .foregroundStyle(MaillonTheme.Colors.sand)

            Text("MAILLON déploie une infrastructure mesh radio longue portée en France, indépendante des réseaux mobiles classiques. Connectez votre nœud Meshtastic pour rejoindre le réseau et communiquer hors couverture cellulaire.")
                .font(MaillonTheme.Typography.body)
                .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
                .fixedSize(horizontal: false, vertical: true)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .maillonCard()
    }
}

#Preview {
    HomeView()
        .environment(MaillonBluetoothManager())
}
