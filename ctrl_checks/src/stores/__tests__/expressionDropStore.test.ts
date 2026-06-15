import { beforeEach, describe, expect, it } from 'vitest';

import { useExpressionDropStore } from '../expressionDropStore';

function resetExpressionDropStore() {
  useExpressionDropStore.setState({ pendingExpression: null });
}

describe('expressionDropStore', () => {
  beforeEach(() => {
    resetExpressionDropStore();
  });

  it('starts without a pending expression', () => {
    expect(useExpressionDropStore.getState().pendingExpression).toBeNull();
  });

  it('stores the pending field key and expression together', () => {
    useExpressionDropStore.getState().setPendingExpression('emailBody', '{{trigger.message}}');

    expect(useExpressionDropStore.getState().pendingExpression).toEqual({
      fieldKey: 'emailBody',
      expression: '{{trigger.message}}',
    });
  });

  it('replaces the previous pending expression atomically', () => {
    const store = useExpressionDropStore.getState();

    store.setPendingExpression('emailBody', '{{trigger.message}}');
    store.setPendingExpression('subject', '{{trigger.subject}}');

    expect(useExpressionDropStore.getState().pendingExpression).toEqual({
      fieldKey: 'subject',
      expression: '{{trigger.subject}}',
    });
  });

  it('clears the pending expression', () => {
    const store = useExpressionDropStore.getState();

    store.setPendingExpression('emailBody', '{{trigger.message}}');
    store.clearPendingExpression();

    expect(useExpressionDropStore.getState().pendingExpression).toBeNull();
  });
});
