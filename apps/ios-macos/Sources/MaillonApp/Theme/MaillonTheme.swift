// MAILLON — tokens design (couleurs, typographie, espacements, radius)
// Source de vérité : apps/common/design-tokens.md

import SwiftUI

enum MaillonTheme {

    // MARK: - Couleurs

    enum Colors {
        // Palette de marque
        static let forest    = Color(red: 31/255,  green: 61/255,  blue: 46/255)   // #1F3D2E
        static let moss      = Color(red: 74/255,  green: 139/255, blue: 106/255)  // #4A8B6A
        static let sand      = Color(red: 245/255, green: 240/255, blue: 230/255)  // #F5F0E6
        static let charcoal  = Color(red: 26/255,  green: 31/255,  blue: 28/255)   // #1A1F1C
        static let signal    = Color(red: 232/255, green: 125/255, blue: 44/255)   // #E87D2C

        // Palette sémantique
        static let cobalt    = Color(red: 40/255,  green: 84/255,  blue: 168/255)  // #2854A8
        static let warning   = Color(red: 232/255, green: 162/255, blue: 44/255)   // #E8A22C
        static let danger    = Color(red: 209/255, green: 68/255,  blue: 68/255)   // #D14444

        // Alias d'usage
        static let background        = charcoal
        static let surface           = forest
        static let onSurface         = sand
        static let onSurfaceMuted    = sand.opacity(0.6)
        static let accent            = signal
    }

    // MARK: - Typographie
    // Inter sera intégré ultérieurement via fichier .ttf — fallback system rounded en attendant

    enum Typography {
        static let display = Font.system(size: 44, weight: .bold,     design: .rounded)
        static let title   = Font.system(size: 28, weight: .semibold, design: .rounded)
        static let h2      = Font.system(size: 24, weight: .semibold, design: .rounded)
        static let h3      = Font.system(size: 20, weight: .medium,   design: .rounded)
        static let bodyLg  = Font.system(size: 17, weight: .regular,  design: .rounded)
        static let body    = Font.system(size: 15, weight: .regular,  design: .rounded)
        static let caption = Font.system(size: 13, weight: .regular,  design: .rounded)
        static let micro   = Font.system(size: 11, weight: .medium,   design: .rounded)

        // Police monospace pour IDs nœuds, données techniques
        static let monoBody    = Font.system(size: 15, weight: .regular, design: .monospaced)
        static let monoCaption = Font.system(size: 13, weight: .regular, design: .monospaced)
    }

    // MARK: - Espacements (système 4 pt)

    enum Spacing {
        static let xs:  CGFloat = 4
        static let sm:  CGFloat = 8
        static let md:  CGFloat = 12
        static let lg:  CGFloat = 16
        static let xl:  CGFloat = 24
        static let xxl: CGFloat = 32
        static let xxxl: CGFloat = 48
    }

    // MARK: - Radius

    enum Radius {
        static let sm: CGFloat = 6
        static let md: CGFloat = 8
        static let lg: CGFloat = 12
        static let pill: CGFloat = 999
    }
}

// MARK: - Modificateurs réutilisables

extension View {
    // Style carte sombre avec bordure subtile, utilisé partout dans l'app
    func maillonCard() -> some View {
        self
            .padding(MaillonTheme.Spacing.lg)
            .background(MaillonTheme.Colors.surface)
            .clipShape(RoundedRectangle(cornerRadius: MaillonTheme.Radius.lg, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: MaillonTheme.Radius.lg, style: .continuous)
                    .stroke(MaillonTheme.Colors.moss.opacity(0.25), lineWidth: 1)
            )
    }
}
