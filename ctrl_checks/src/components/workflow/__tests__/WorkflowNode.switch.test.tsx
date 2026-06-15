import { describe, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import WorkflowNode from '../WorkflowNode';

vi.mock('@xyflow/react', () => ({
  Handle: (props: any) => <div data-handle={props?.id || 'default'} />,
  Position: {
    Left: 'left',
    Right: 'right',
    Top: 'top',
    Bottom: 'bottom',
  },
}));

vi.mock('@/stores/debugStore', () => ({
  useDebugStore: () => ({
    openDebug: vi.fn(),
  }),
}));

vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light' as const,
    setTheme: vi.fn(),
    toggleTheme: vi.fn(),
  }),
}));

describe('WorkflowNode switch safety', () => {
  it('renders without crashing for malformed switch cases payload', () => {
    const props: any = {
      id: 'switch_1',
      selected: false,
      data: {
        type: 'switch',
        label: 'Switch',
        category: 'logic',
        icon: 'GitBranch',
        config: {
          cases: '/',
        },
      },
    };

    const html = renderToString(<WorkflowNode {...props} />);
    expect(html).toContain('Switch');
  });
});

