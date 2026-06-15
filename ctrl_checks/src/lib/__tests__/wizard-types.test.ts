import { describe, expectTypeOf, it } from 'vitest';
import type {
  WizardAttachModeKey,
  WizardAttachUnlockKey,
  WizardCredentialPlaneKey,
  WizardFillMode,
} from '../wizard-types';

describe('wizard-types', () => {
  it('keeps the supported fill modes exact', () => {
    expectTypeOf<WizardFillMode>().toEqualTypeOf<
      'manual_static' | 'runtime_ai' | 'buildtime_ai_once'
    >();
  });

  it('keeps attach mode keys compatible with mode node and field segments', () => {
    expectTypeOf<WizardAttachModeKey>().toEqualTypeOf<`mode_${string}_${string}`>();
    expectTypeOf<'mode_manualTrigger_prompt'>().toMatchTypeOf<WizardAttachModeKey>();
    expectTypeOf<'mode_googleSheets_spreadsheetId'>().toMatchTypeOf<WizardAttachModeKey>();
  });

  it('keeps unlock keys compatible with unlock node and field segments', () => {
    expectTypeOf<WizardAttachUnlockKey>().toEqualTypeOf<`unlock_${string}_${string}`>();
    expectTypeOf<'unlock_googleSheets_credentials'>().toMatchTypeOf<WizardAttachUnlockKey>();
    expectTypeOf<'unlock_slack_channel'>().toMatchTypeOf<WizardAttachUnlockKey>();
  });

  it('keeps credential plane keys string-compatible', () => {
    expectTypeOf<WizardCredentialPlaneKey>().toEqualTypeOf<string>();
    expectTypeOf<'googleSheets::spreadsheetId'>().toMatchTypeOf<WizardCredentialPlaneKey>();
  });
});
