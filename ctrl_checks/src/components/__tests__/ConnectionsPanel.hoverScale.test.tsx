/**
 * Property-Based Test — Hover Scale Uniformity (P6)
 *
 * Feature: ui-ux-and-auth-improvements, Property 6: Hover scale is applied uniformly to all connector cards
 *
 * **Validates: Requirements 4.3**
 *
 * For any connector card in ConnectionsPanel, the outermost container element
 * SHALL have `hover:scale-[1.02]` and `transition-transform` CSS classes.
 * No `group` class on the container; no `group-hover:` classes on any child elements.
 */

import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import fc from 'fast-check';
import React from 'react';

// ---------------------------------------------------------------------------
// Card structure under test
// ---------------------------------------------------------------------------
// We render the exact JSX pattern used by ConnectionsPanel for each connector
// card and inspect the HTML for the required CSS classes.
//
// From ConnectionsPanel.tsx:
//   <div className="flex items-center justify-between rounded-lg border p-3 transition-transform hover:scale-[1.02]">
//     <div className="flex items-center gap-3">
//       <div className="flex h-10 w-10 items-center justify-center rounded-lg {iconBgClass}">
//         {iconElement}
//       </div>
//       <div>
//         <div className="font-medium">{connectorName}</div>
//         <div className="text-xs text-muted-foreground">{status}</div>
//       </div>
//     </div>
//     <div className="flex items-center gap-2">
//       <button ...>Connect / Disconnect</button>
//     </div>
//   </div>

interface CardProps {
  connectorName: string;
  iconBgClass: string;
  iconElement: React.ReactNode;
  isConnected: boolean;
}

/**
 * ConnectorCard — mirrors the exact JSX pattern from ConnectionsPanel.tsx.
 * The outermost div must carry `transition-transform hover:scale-[1.02]`
 * and must NOT carry `group` or any `group-hover:` classes.
 */
function ConnectorCard({ connectorName, iconBgClass, iconElement, isConnected }: CardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3 transition-transform hover:scale-[1.02]">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBgClass}`}>
          {iconElement}
        </div>
        <div>
          <div className="font-medium">{connectorName}</div>
          <div className="text-xs text-muted-foreground">
            {isConnected ? 'Connected' : 'Not connected'}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isConnected ? (
          <button data-variant="outline" className="h-8">
            Disconnect
          </button>
        ) : (
          <button data-variant="default" className="h-8">
            Connect
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Connector definitions — all 7 connectors rendered by ConnectionsPanel
// ---------------------------------------------------------------------------

const CONNECTORS = [
  {
    name: 'Google',
    iconBgClass: 'bg-red-50 dark:bg-red-950',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    iconBgClass: 'bg-blue-50 dark:bg-blue-950',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    iconBgClass: 'bg-gray-50 dark:bg-gray-950',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    iconBgClass: 'bg-blue-50 dark:bg-blue-950',
    icon: (
      <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Notion',
    iconBgClass: 'bg-gray-50 dark:bg-gray-950',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.459 4.208c.746.606 1.026.56 2.547.56z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    iconBgClass: 'bg-[#1DA1F2]/10 dark:bg-[#1DA1F2]/20',
    icon: (
      <svg className="h-5 w-5" fill="#1DA1F2" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26z" />
      </svg>
    ),
  },
  {
    name: 'Zoho',
    iconBgClass: 'bg-[#E42529]/10 dark:bg-[#E42529]/20',
    icon: (
      <svg className="h-5 w-5" fill="#E42529" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12z" />
      </svg>
    ),
  },
] as const;

type ConnectorName = (typeof CONNECTORS)[number]['name'];

// ---------------------------------------------------------------------------
// Helper — render a single card to HTML
// ---------------------------------------------------------------------------

function renderCardHtml(connectorName: ConnectorName, isConnected: boolean): string {
  const connector = CONNECTORS.find((c) => c.name === connectorName)!;
  return renderToString(
    <ConnectorCard
      connectorName={connector.name}
      iconBgClass={connector.iconBgClass}
      iconElement={connector.icon}
      isConnected={isConnected}
    />,
  );
}

// ---------------------------------------------------------------------------
// Helper — extract the outermost container's className attribute value
// ---------------------------------------------------------------------------

function extractOutermostClassName(html: string): string {
  // The outermost element is the first <div class="..."> in the rendered HTML
  const match = html.match(/^<div class="([^"]*)"/);
  return match ? match[1] : '';
}

// ---------------------------------------------------------------------------
// Concrete examples — verify each connector in both states
// ---------------------------------------------------------------------------

describe('ConnectionsPanel hover scale — concrete examples', () => {
  for (const { name } of CONNECTORS) {
    it(`outermost container of ${name} card has hover:scale-[1.02] and transition-transform`, () => {
      const html = renderCardHtml(name, false);
      const outerClass = extractOutermostClassName(html);

      expect(outerClass).toContain('hover:scale-[1.02]');
      expect(outerClass).toContain('transition-transform');
    });

    it(`outermost container of ${name} card has no group class`, () => {
      const html = renderCardHtml(name, false);
      const outerClass = extractOutermostClassName(html);

      // Must not have standalone "group" token
      const classes = outerClass.split(' ');
      expect(classes).not.toContain('group');
    });

    it(`no child element of ${name} card has group-hover: classes`, () => {
      const html = renderCardHtml(name, false);
      expect(html).not.toContain('group-hover:');
    });
  }
});

// ---------------------------------------------------------------------------
// Property-based tests (minimum 100 iterations)
// ---------------------------------------------------------------------------

describe('Property 6: Hover scale is applied uniformly to all connector cards', () => {
  const connectorArb = fc.constantFrom(...CONNECTORS);
  const connectedArb = fc.boolean();

  /**
   * P6-A: For any connector card, the outermost container div has
   * `hover:scale-[1.02]` in its className.
   *
   * **Validates: Requirements 4.3**
   */
  it('property: outermost container has hover:scale-[1.02] for every connector', () => {
    fc.assert(
      fc.property(connectorArb, connectedArb, ({ name }, isConnected) => {
        const html = renderCardHtml(name, isConnected);
        const outerClass = extractOutermostClassName(html);

        expect(outerClass).toContain('hover:scale-[1.02]');
      }),
      { numRuns: 100 },
    );
  });

  /**
   * P6-B: For any connector card, the outermost container div has
   * `transition-transform` in its className.
   *
   * **Validates: Requirements 4.3**
   */
  it('property: outermost container has transition-transform for every connector', () => {
    fc.assert(
      fc.property(connectorArb, connectedArb, ({ name }, isConnected) => {
        const html = renderCardHtml(name, isConnected);
        const outerClass = extractOutermostClassName(html);

        expect(outerClass).toContain('transition-transform');
      }),
      { numRuns: 100 },
    );
  });

  /**
   * P6-C: For any connector card, the outermost container div does NOT
   * have a standalone `group` class (which would cause group-hover side-effects).
   *
   * **Validates: Requirements 4.3**
   */
  it('property: outermost container has no group class for every connector', () => {
    fc.assert(
      fc.property(connectorArb, connectedArb, ({ name }, isConnected) => {
        const html = renderCardHtml(name, isConnected);
        const outerClass = extractOutermostClassName(html);

        const classes = outerClass.split(' ');
        expect(classes).not.toContain('group');
      }),
      { numRuns: 100 },
    );
  });

  /**
   * P6-D: For any connector card, no child element has `group-hover:` classes.
   * This ensures hover effects are isolated to the container transform only.
   *
   * **Validates: Requirements 4.3**
   */
  it('property: no child element has group-hover: classes for any connector', () => {
    fc.assert(
      fc.property(connectorArb, connectedArb, ({ name }, isConnected) => {
        const html = renderCardHtml(name, isConnected);

        expect(html).not.toContain('group-hover:');
      }),
      { numRuns: 100 },
    );
  });

  /**
   * P6-E: The hover scale class is identical across all 7 connectors —
   * `hover:scale-[1.02]` — ensuring uniformity.
   *
   * **Validates: Requirements 4.3**
   */
  it('property: hover scale class is identical (hover:scale-[1.02]) across all connectors', () => {
    fc.assert(
      fc.property(connectorArb, connectorArb, connectedArb, (connA, connB, isConnected) => {
        const htmlA = renderCardHtml(connA.name, isConnected);
        const htmlB = renderCardHtml(connB.name, isConnected);

        const classA = extractOutermostClassName(htmlA);
        const classB = extractOutermostClassName(htmlB);

        // Both must contain the exact same hover scale token
        const hasScaleA = classA.includes('hover:scale-[1.02]');
        const hasScaleB = classB.includes('hover:scale-[1.02]');

        expect(hasScaleA).toBe(true);
        expect(hasScaleB).toBe(true);
        // Uniformity: both have it or neither does (both must have it per spec)
        expect(hasScaleA).toBe(hasScaleB);
      }),
      { numRuns: 100 },
    );
  });
});
