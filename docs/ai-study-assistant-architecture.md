# AI Assistant Removal

The in-app AI assistant was removed on 2026-10-02 by explicit product decision.
Ask AI controls, the disabled endpoint, runtime grounding helpers and its build generator are no longer part of the app.
AI-assisted authoring continues to use the canonical PYQ master and official sources. It does not require a runtime AI assistant.
Historical AI quota tables may remain in deployed Supabase databases. Do not drop user records as part of this code cleanup.
