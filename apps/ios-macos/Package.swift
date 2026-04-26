// swift-tools-version: 5.9
// MAILLON — Package universel iOS / iPadOS / macOS

import PackageDescription

let package = Package(
    name: "MaillonApp",
    defaultLocalization: "fr",
    platforms: [
        .iOS(.v17),
        .macCatalyst(.v17),
        .macOS(.v14)
    ],
    products: [
        .library(
            name: "MaillonApp",
            targets: ["MaillonApp"]
        )
    ],
    dependencies: [
        // SDK officiel Meshtastic — protocole LoRa, BLE, parsing protobuf, canaux
        .package(
            url: "https://github.com/meshtastic/Meshtastic-Apple.git",
            branch: "main"
        )
    ],
    targets: [
        .target(
            name: "MaillonApp",
            dependencies: [
                .product(name: "MeshtasticProtobufs", package: "Meshtastic-Apple")
            ],
            path: "Sources/MaillonApp"
        )
    ]
)
