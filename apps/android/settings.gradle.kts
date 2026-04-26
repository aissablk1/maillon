// MAILLON Android — settings Gradle racine
// Référence : https://docs.gradle.org/current/userguide/multi_project_builds.html

pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        // Meshtastic SDK — JitPack tant que la lib n'est pas sur Maven Central
        maven { url = uri("https://jitpack.io") }
    }
}

rootProject.name = "MAILLON"
include(":app")

// Quand le SDK Meshtastic Android sera intégré en sous-module :
// includeBuild("libs/meshtastic-android")
