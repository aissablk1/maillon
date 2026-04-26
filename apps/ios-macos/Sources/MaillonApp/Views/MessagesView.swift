// MAILLON — chat texte sur le canal MAILLON-PUBLIC

import SwiftUI

struct MessagesView: View {
    @Environment(MaillonBluetoothManager.self) private var bluetooth
    @State private var draft: String = ""
    @FocusState private var inputFocused: Bool

    var body: some View {
        ZStack {
            MaillonTheme.Colors.background.ignoresSafeArea()

            VStack(spacing: 0) {
                channelHeader
                Divider().background(MaillonTheme.Colors.moss.opacity(0.3))
                messageList
                inputBar
            }
        }
        .navigationTitle("Messages")
        #if os(iOS)
        .navigationBarTitleDisplayMode(.inline)
        #endif
    }

    // MARK: - Header

    private var channelHeader: some View {
        HStack(spacing: MaillonTheme.Spacing.sm) {
            Image(systemName: "number")
                .font(MaillonTheme.Typography.bodyLg)
                .foregroundStyle(MaillonTheme.Colors.signal)

            VStack(alignment: .leading, spacing: 2) {
                Text(bluetooth.defaultChannel)
                    .font(MaillonTheme.Typography.bodyLg.weight(.semibold))
                    .foregroundStyle(MaillonTheme.Colors.sand)
                Text("Canal public — \(bluetooth.messages.count) message(s)")
                    .font(MaillonTheme.Typography.caption)
                    .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
            }
            Spacer()
        }
        .padding(.horizontal, MaillonTheme.Spacing.lg)
        .padding(.vertical, MaillonTheme.Spacing.md)
        .background(MaillonTheme.Colors.surface)
    }

    // MARK: - Liste messages

    private var messageList: some View {
        ScrollViewReader { proxy in
            ScrollView {
                LazyVStack(spacing: MaillonTheme.Spacing.sm) {
                    if bluetooth.messages.isEmpty {
                        emptyHint
                            .padding(.top, MaillonTheme.Spacing.xxxl)
                    } else {
                        ForEach(bluetooth.messages) { message in
                            messageBubble(message)
                                .id(message.id)
                        }
                    }
                }
                .padding(MaillonTheme.Spacing.lg)
                .frame(maxWidth: 720)
                .frame(maxWidth: .infinity)
            }
            .onChange(of: bluetooth.messages.count) { _, _ in
                if let last = bluetooth.messages.last {
                    withAnimation(.easeOut(duration: 0.2)) {
                        proxy.scrollTo(last.id, anchor: .bottom)
                    }
                }
            }
        }
    }

    private var emptyHint: some View {
        VStack(spacing: MaillonTheme.Spacing.md) {
            Image(systemName: "bubble.left.and.bubble.right")
                .font(.system(size: 48, weight: .light))
                .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
            Text("Aucun message pour l'instant")
                .font(MaillonTheme.Typography.h3)
                .foregroundStyle(MaillonTheme.Colors.sand)
            Text("Envoyez le premier message sur ce canal MAILLON.")
                .font(MaillonTheme.Typography.body)
                .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
        }
    }

    private func messageBubble(_ message: MaillonMessage) -> some View {
        HStack {
            if message.isOutgoing { Spacer(minLength: 48) }

            VStack(alignment: message.isOutgoing ? .trailing : .leading, spacing: 4) {
                if !message.isOutgoing {
                    Text(message.senderName)
                        .font(MaillonTheme.Typography.micro.weight(.semibold))
                        .foregroundStyle(MaillonTheme.Colors.moss)
                }

                Text(message.body)
                    .font(MaillonTheme.Typography.body)
                    .foregroundStyle(message.isOutgoing ? MaillonTheme.Colors.charcoal : MaillonTheme.Colors.sand)
                    .padding(.horizontal, MaillonTheme.Spacing.md)
                    .padding(.vertical, MaillonTheme.Spacing.sm)
                    .background(message.isOutgoing ? MaillonTheme.Colors.signal : MaillonTheme.Colors.surface)
                    .clipShape(RoundedRectangle(cornerRadius: MaillonTheme.Radius.lg, style: .continuous))

                Text(message.timestamp.formatted(date: .omitted, time: .shortened))
                    .font(MaillonTheme.Typography.micro)
                    .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
            }
            .frame(maxWidth: 480, alignment: message.isOutgoing ? .trailing : .leading)

            if !message.isOutgoing { Spacer(minLength: 48) }
        }
    }

    // MARK: - Barre d'envoi

    private var inputBar: some View {
        VStack(spacing: 0) {
            Divider().background(MaillonTheme.Colors.moss.opacity(0.3))

            HStack(spacing: MaillonTheme.Spacing.sm) {
                TextField("Message…", text: $draft, axis: .vertical)
                    .textFieldStyle(.plain)
                    .lineLimit(1...4)
                    .font(MaillonTheme.Typography.body)
                    .foregroundStyle(MaillonTheme.Colors.sand)
                    .padding(.horizontal, MaillonTheme.Spacing.md)
                    .padding(.vertical, MaillonTheme.Spacing.sm)
                    .background(MaillonTheme.Colors.surface)
                    .clipShape(RoundedRectangle(cornerRadius: MaillonTheme.Radius.md, style: .continuous))
                    .focused($inputFocused)
                    .disabled(!bluetooth.connectionState.isConnected)

                Button(action: send) {
                    Image(systemName: "paperplane.fill")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundStyle(canSend ? MaillonTheme.Colors.charcoal : MaillonTheme.Colors.onSurfaceMuted)
                        .frame(width: 40, height: 40)
                        .background(canSend ? MaillonTheme.Colors.signal : MaillonTheme.Colors.surface)
                        .clipShape(Circle())
                }
                .buttonStyle(.plain)
                .disabled(!canSend)
            }
            .padding(MaillonTheme.Spacing.md)
            .background(MaillonTheme.Colors.background)

            if !bluetooth.connectionState.isConnected {
                disconnectedNotice
            }
        }
    }

    private var disconnectedNotice: some View {
        HStack(spacing: MaillonTheme.Spacing.sm) {
            Image(systemName: "exclamationmark.triangle.fill")
                .foregroundStyle(MaillonTheme.Colors.warning)
            Text("Connectez un nœud pour envoyer des messages.")
                .font(MaillonTheme.Typography.caption)
                .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.horizontal, MaillonTheme.Spacing.lg)
        .padding(.vertical, MaillonTheme.Spacing.sm)
        .background(MaillonTheme.Colors.surface)
    }

    private var canSend: Bool {
        bluetooth.connectionState.isConnected
        && !draft.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    private func send() {
        bluetooth.sendTextMessage(draft)
        draft = ""
        inputFocused = true
    }
}

#Preview {
    NavigationStack {
        MessagesView()
            .environment(MaillonBluetoothManager())
    }
}
