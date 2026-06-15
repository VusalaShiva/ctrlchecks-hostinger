/**
 * ✅ FACEBOOK NODE - Migrated to Registry
 * 
 * Facebook integration.
 */

import type { UnifiedNodeDefinition } from '../../types/unified-node-contract';
import type { NodeSchema } from '../../../services/nodes/node-library';
import { executeViaLegacyExecutor } from '../unified-node-registry-legacy-adapter';

export function overrideFacebook(
  def: UnifiedNodeDefinition,
  schema: NodeSchema
): UnifiedNodeDefinition {
  return {
    ...def,
    credentialSchema: {
      requirements: [{
        provider: 'facebook',
        category: 'oauth',
        required: true,
        description: 'Facebook OAuth connection',
        credentialTypeId: 'facebook_oauth2',
        authType: 'oauth2' as const,
        label: 'Facebook Account',
      }],
      credentialFields: ['accessToken'],
    },
    execute: async (context) => {
      return await executeViaLegacyExecutor({ context, schema });
    },
  };
}
