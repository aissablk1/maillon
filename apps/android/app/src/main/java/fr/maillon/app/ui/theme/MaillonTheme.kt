package fr.maillon.app.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.core.view.WindowCompat

/**
 * Thème MAILLON — couleurs et typographie issues de `apps/common/design-tokens.md`.
 *
 * Toute modification de ces valeurs doit être répercutée dans :
 *  - apps/ios-macos/MaillonTheme.swift
 *  - apps/desktop/src/styles.css
 */
object MaillonColors {
    val Forest = Color(0xFF1F3D2E)      // fond primaire dark, brand
    val Moss = Color(0xFF4A8B6A)        // accent, succès
    val Sand = Color(0xFFF5F0E6)        // fond clair, texte sur dark
    val Charcoal = Color(0xFF1A1F1C)    // texte principal, fond dark profond
    val Signal = Color(0xFFE87D2C)      // alertes, SOS, CTA primaire
    val Cobalt = Color(0xFF2854A8)      // liens, infos B2B
    val Warning = Color(0xFFE8A22C)
    val Danger = Color(0xFFD14444)
}

private val MaillonLightColorScheme = lightColorScheme(
    primary = MaillonColors.Forest,
    onPrimary = MaillonColors.Sand,
    primaryContainer = MaillonColors.Moss,
    onPrimaryContainer = MaillonColors.Sand,
    secondary = MaillonColors.Moss,
    onSecondary = MaillonColors.Sand,
    tertiary = MaillonColors.Signal,
    onTertiary = MaillonColors.Charcoal,
    background = MaillonColors.Sand,
    onBackground = MaillonColors.Charcoal,
    surface = MaillonColors.Sand,
    onSurface = MaillonColors.Charcoal,
    surfaceVariant = Color(0xFFE8E1D2),
    onSurfaceVariant = MaillonColors.Charcoal,
    error = MaillonColors.Danger,
    onError = MaillonColors.Sand,
    outline = Color(0xFF8C8674)
)

private val MaillonDarkColorScheme = darkColorScheme(
    primary = MaillonColors.Moss,
    onPrimary = MaillonColors.Charcoal,
    primaryContainer = MaillonColors.Forest,
    onPrimaryContainer = MaillonColors.Sand,
    secondary = MaillonColors.Moss,
    onSecondary = MaillonColors.Charcoal,
    tertiary = MaillonColors.Signal,
    onTertiary = MaillonColors.Charcoal,
    background = MaillonColors.Charcoal,
    onBackground = MaillonColors.Sand,
    surface = MaillonColors.Forest,
    onSurface = MaillonColors.Sand,
    surfaceVariant = Color(0xFF2A3D33),
    onSurfaceVariant = MaillonColors.Sand,
    error = MaillonColors.Danger,
    onError = MaillonColors.Sand,
    outline = Color(0xFF6F7A72)
)

// Inter est chargée via Google Fonts en Phase 1 (androidx.compose.ui:ui-text-google-fonts).
// Pour l'instant on utilise FontFamily.Default — système. L'échelle reste fidèle aux design tokens.
private val MaillonFont = FontFamily.Default

private val MaillonTypography = Typography(
    displayLarge = TextStyle(fontFamily = MaillonFont, fontWeight = FontWeight.Bold, fontSize = 44.sp, lineHeight = 52.sp),
    headlineLarge = TextStyle(fontFamily = MaillonFont, fontWeight = FontWeight.SemiBold, fontSize = 28.sp, lineHeight = 36.sp),
    headlineMedium = TextStyle(fontFamily = MaillonFont, fontWeight = FontWeight.SemiBold, fontSize = 24.sp, lineHeight = 32.sp),
    titleLarge = TextStyle(fontFamily = MaillonFont, fontWeight = FontWeight.SemiBold, fontSize = 20.sp, lineHeight = 28.sp),
    titleMedium = TextStyle(fontFamily = MaillonFont, fontWeight = FontWeight.Medium, fontSize = 17.sp, lineHeight = 24.sp),
    bodyLarge = TextStyle(fontFamily = MaillonFont, fontWeight = FontWeight.Normal, fontSize = 15.sp, lineHeight = 22.sp),
    bodyMedium = TextStyle(fontFamily = MaillonFont, fontWeight = FontWeight.Normal, fontSize = 13.sp, lineHeight = 20.sp),
    labelLarge = TextStyle(fontFamily = MaillonFont, fontWeight = FontWeight.Medium, fontSize = 13.sp, lineHeight = 18.sp),
    labelSmall = TextStyle(fontFamily = MaillonFont, fontWeight = FontWeight.Medium, fontSize = 11.sp, lineHeight = 16.sp)
)

@Composable
fun MaillonTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Couleur dynamique désactivée par défaut — la marque MAILLON prime sur Material You.
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val ctx = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(ctx) else dynamicLightColorScheme(ctx)
        }
        darkTheme -> MaillonDarkColorScheme
        else -> MaillonLightColorScheme
    }

    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = MaillonTypography,
        content = content
    )
}
