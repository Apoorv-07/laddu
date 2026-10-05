# LADDU — first vertical slice plan

## Environment inspection (2026-10-06, Asia/Calcutta)
- OS: Linux 6.1.158, x86_64 sandbox; Windows-native tests cannot run here.
- Node.js: v20.20.2; npm 10.8.2.
- Electron: npm registry reports 44.5.1 available; no global Electron binary.
- Python: 3.13.14.
- GPU inventory: no PCI display device exposed in the sandbox.
- LM Studio: no process detected; configured endpoint will be probed at runtime.
- Voicebox: no process detected; official current API reviewed from the project README/docs search. Local REST defaults to `http://127.0.0.1:17493`; health/profiles/generate/speak/transcribe endpoints are treated as optional and runtime-detected. MCP is not needed for this first slice.

## Smallest real vertical slice
1. Electron frameless transparent orb window with runtime-generated SVG face and smooth expression transitions.
2. Click-to-engage and text interaction. Voice input is intentionally not claimed in this slice until a real STT provider is configured.
3. Provider-agnostic text mind: probes LM Studio's OpenAI-compatible `/v1/models`, then calls `/v1/chat/completions`; offline state is explicit.
4. Language router for English, Hindi Devanagari, and Hinglish/code-switching. It preserves raw text and emits a routing record.
5. Optional Voicebox adapter: probes `/health`, discovers `/profiles`, and uses `/speak` or `/generate` only when actually available. No fake audio fallback.
6. Windows desktop action adapter: on Windows only, uses typed PowerShell/Win32-oriented scripts to launch/focus/close Notepad and returns `ok` separately from `verified`; on non-Windows it returns `UNAVAILABLE`.
7. Observe → act → observe → verify for the Notepad action. The response is based on verification, not planner completion.
8. Capability registry is the single source for UI/diagnostics state.

## Verification boundary
This environment cannot verify Windows UI input, Electron GPU behavior, LM Studio, Voicebox, or Hindi audio quality. The app exposes those states honestly and includes npm doctor commands for a Windows machine. No claim of Windows or voice success is made from this sandbox.

## Next blocker after this slice
Run the packaged Electron app on Windows and execute the real harness/doctor. Then add a real local STT provider and persistent memory before expanding planner/autonomy.
