// MAILLON — entrée principale de l'app universelle (iOS, iPadOS, macOS Catalyst)

import SwiftUI

@main
struct MaillonApp: App {
    // Manager BLE partagé sur toute l'app, instancié une seule fois
    @State private var bluetoothManager = MaillonBluetoothManager()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(bluetoothManager)
                .tint(MaillonTheme.Colors.signal)
                .preferredColorScheme(.dark)
        }
        #if os(macOS)
        .defaultSize(width: 980, height: 700)
        .windowResizability(.contentMinSize)
        #endif
    }
}

// Conteneur de navigation principal — TabView sur iPhone, NavigationSplitView sur iPad/Mac
private struct RootView: View {
    @Environment(MaillonBluetoothManager.self) private var bluetooth
    @State private var selection: Section = .home

    var body: some View {
        #if os(iOS)
        if UIDevice.current.userInterfaceIdiom == .phone {
            phoneTabs
        } else {
            splitView
        }
        #else
        splitView
        #endif
    }

    // Navigation iPhone — TabView compact
    private var phoneTabs: some View {
        TabView(selection: $selection) {
            HomeView()
                .tabItem { Label("Accueil", systemImage: "antenna.radiowaves.left.and.right") }
                .tag(Section.home)

            DeviceListView()
                .tabItem { Label("Nœuds", systemImage: "dot.radiowaves.left.and.right") }
                .tag(Section.devices)

            MessagesView()
                .tabItem { Label("Messages", systemImage: "bubble.left.and.bubble.right") }
                .tag(Section.messages)
        }
    }

    // Navigation iPad / Mac — sidebar persistante
    private var splitView: some View {
        NavigationSplitView {
            List(Section.allCases, selection: $selection) { section in
                NavigationLink(value: section) {
                    Label(section.title, systemImage: section.icon)
                }
            }
            .navigationTitle("MAILLON")
            .listStyle(.sidebar)
        } detail: {
            switch selection {
            case .home: HomeView()
            case .devices: DeviceListView()
            case .messages: MessagesView()
            }
        }
    }
}

private enum Section: String, CaseIterable, Identifiable, Hashable {
    case home, devices, messages
    var id: String { rawValue }

    var title: String {
        switch self {
        case .home: return "Accueil"
        case .devices: return "Nœuds"
        case .messages: return "Messages"
        }
    }

    var icon: String {
        switch self {
        case .home: return "antenna.radiowaves.left.and.right"
        case .devices: return "dot.radiowaves.left.and.right"
        case .messages: return "bubble.left.and.bubble.right"
        }
    }
}
