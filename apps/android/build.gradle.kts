// MAILLON Android — build Gradle racine
// Centralise les versions des plugins. Les versions des libs sont dans app/build.gradle.kts.

plugins {
    id("com.android.application") version "8.2.2" apply false
    id("com.android.library") version "8.2.2" apply false
    id("org.jetbrains.kotlin.android") version "1.9.22" apply false
    // Compose Compiler suit Kotlin depuis Kotlin 1.9 (plugin séparé requis dès K2 / 2.0)
    // id("org.jetbrains.kotlin.plugin.compose") version "2.0.0" apply false
}

tasks.register("clean", Delete::class) {
    delete(rootProject.layout.buildDirectory)
}
