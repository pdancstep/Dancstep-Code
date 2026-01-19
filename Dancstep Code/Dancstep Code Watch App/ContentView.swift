//
//  ContentView.swift
//  Dancstep Code Watch App
//
//  Created by PAUL DANCSTEP on 1/18/26.
//

import SwiftUI

struct ContentView: View {
    // MARK: - State
    @State private var codeWord: [Int] = []  // Current symbol sequence (1=dot, 2=dash, 3=both)
    @State private var decodedText: String = ""  // Completed characters

    var body: some View {
        GeometryReader { geometry in
            let width = geometry.size.width
            let height = geometry.size.height
            let buttonSize: CGFloat = min(width * 0.28, 50)
            let buttonY = height * 0.75

            ZStack {
                // Background - split screen
                HStack(spacing: 0) {
                    Color.gray.opacity(0.4)
                    Color.gray.opacity(0.25)
                }
                .ignoresSafeArea()

                // Text display area (center of screen)
                HStack(spacing: 2) {
                    // Decoded text (left of center)
                    Text(decodedText)
                        .font(.system(size: 20, weight: .medium, design: .monospaced))
                        .foregroundColor(.primary)

                    // Current symbols (right of center)
                    HStack(spacing: 4) {
                        ForEach(Array(codeWord.enumerated()), id: \.offset) { _, symbol in
                            SymbolView(symbol: symbol, size: 16)
                        }
                    }
                }
                .position(x: width / 2, y: height * 0.4)

                // Left button (dot)
                Circle()
                    .fill(Color.black)
                    .overlay(Circle().stroke(Color.white, lineWidth: 2))
                    .frame(width: buttonSize, height: buttonSize)
                    .position(x: width * 0.28, y: buttonY)
                    .onTapGesture {
                        buttonTapped(symbol: 1)
                    }

                // Right button (dash)
                Circle()
                    .fill(Color.white)
                    .overlay(Circle().stroke(Color.black, lineWidth: 2))
                    .frame(width: buttonSize, height: buttonSize)
                    .position(x: width * 0.72, y: buttonY)
                    .onTapGesture {
                        buttonTapped(symbol: 2)
                    }
            }
        }
    }

    // MARK: - Actions
    private func buttonTapped(symbol: Int) {
        codeWord.append(symbol)

        // Check if we have a valid character
        if let character = decodeSymbols(codeWord) {
            decodedText.append(character)
            codeWord.removeAll()
        }
    }

    // MARK: - Decoding
    private func decodeSymbols(_ symbols: [Int]) -> Character? {
        // Character encoding tree based on the JavaScript implementation
        switch symbols {
        // 2-symbol codes (most common letters)
        case [1, 1]: return "T"
        case [1, 2]: return "A"
        case [2, 1]: return "O"
        case [2, 2]: return "I"
        case [3, 2]: return "E"

        // 3-symbol codes
        case [1, 3, 1]: return "D"
        case [1, 3, 2]: return "L"
        case [1, 3, 3]: return "C"
        case [2, 3, 1]: return "U"
        case [2, 3, 2]: return "M"
        case [2, 3, 3]: return "W"
        case [3, 1, 1]: return "H"
        case [3, 1, 2]: return "R"
        case [3, 3, 1]: return "N"
        case [3, 3, 2]: return "S"

        // 4-symbol codes
        case [3, 1, 3, 1]: return "Y"
        case [3, 1, 3, 2]: return "P"
        case [3, 1, 3, 3]: return "B"
        case [3, 3, 3, 1]: return "F"
        case [3, 3, 3, 2]: return "G"

        // 5-symbol codes
        case [3, 3, 3, 3, 1]: return "K"
        case [3, 3, 3, 3, 2]: return "V"

        // 6-symbol codes
        case [3, 3, 3, 3, 3, 1]: return "J"
        case [3, 3, 3, 3, 3, 2]: return "X"

        // 7-symbol codes
        case [3, 3, 3, 3, 3, 3, 1]: return "Q"
        case [3, 3, 3, 3, 3, 3, 2]: return "Z"

        default: return nil
        }
    }
}

// MARK: - Symbol View
struct SymbolView: View {
    let symbol: Int
    let size: CGFloat

    var body: some View {
        switch symbol {
        case 1: // Dot - black circle
            Circle()
                .fill(Color.black)
                .overlay(Circle().stroke(Color.white, lineWidth: 1))
                .frame(width: size, height: size)
        case 2: // Dash - white circle
            Circle()
                .fill(Color.white)
                .overlay(Circle().stroke(Color.black, lineWidth: 1))
                .frame(width: size, height: size)
        case 3: // Both - half and half
            DoubleSymbol(size: size)
        default:
            EmptyView()
        }
    }
}

// MARK: - Double Symbol (half black, half white)
struct DoubleSymbol: View {
    let size: CGFloat

    var body: some View {
        ZStack {
            // White half (right)
            Circle()
                .fill(Color.white)

            // Black half (left) using a clip shape
            Circle()
                .fill(Color.black)
                .clipShape(
                    Rectangle()
                        .offset(x: -size / 4)
                )

            // Border
            Circle()
                .stroke(Color.gray, lineWidth: 1)
        }
        .frame(width: size, height: size)
    }
}

#Preview {
    ContentView()
}
