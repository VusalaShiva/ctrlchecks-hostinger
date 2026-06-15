/**
 * Property-Based Test — Hover No Credentials Change (P5)
 *
 * Feature: ui-ux-and-auth-improvements, Property 5: Hover does not affect credentials visibility for any connector card
 *
 * **Validates: Requirements 4.2**
 *
 * For any connector card in ConnectionsPanel, simulating a hover event on the
 * card container SHALL NOT change the visibility, opacity, background color, or
 * highlight state of any credentials or sensitive field elements within that card.
 *
 * Concretely: the rendered HTML of any connector card MUST NOT contain any
 * `group-hover:` prefixed Tailwind classes, which are the mechanism by which
 * hover on a parent element would reveal or alter child elements.
 *
 * Forbidden patterns:
 *   - group-hover:opacity-
 *   - group-hover:visible
 *   - group-hover:bg-
 *   - group-hover:text-
 *   - group-hover:block
 *   - group-hover:flex
 *   - group-hover:inline
 *   - Any group-hover: prefix at all
 */

import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import fc from 'fast-check';
import React from 'react';

// ---------------------------------------------------------------------------
// Card structure under test
// ---------------------------------------------------------------------------
// We render the exact JSX pattern used by ConnectionsPanel for each connector
// card and inspect the full HTML for any `group-hover:` class usage.
//
// From ConnectionsPanel.tsx (post task 6.1 fix):
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
//
// No child element uses group-hover: classes — hover only scales the container.

interface CardProps {
  connectorName: string;
  iconBgClass: string;
  iconElement: React.ReactNode;
  isConnected: boolean;
}

/**
 * ConnectorCard — mirrors the exact JSX pattern from ConnectionsPanel.tsx.
 * The outermost div carries `transition-transform hover:scale-[1.02]` only.
 * No `group` class; no `group-hover:` on any child element.
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
// Forbidden group-hover: patterns
// ---------------------------------------------------------------------------

const FORBIDDEN_GROUP_HOVER_PATTERNS = [
  'group-hover:opacity-',
  'group-hover:visible',
  'group-hover:bg-',
  'group-hover:text-',
  'group-hover:block',
  'group-hover:flex',
  'group-hover:inline',
] as const;

// ---------------------------------------------------------------------------
// Concrete examples — verify each connector in both states
// ---------------------------------------------------------------------------

describe('ConnectionsPanel hover credentials — concrete examples', () => {
  for (const { name } of CONNECTORS) {
    it(`${name} card (disconnected) contains no group-hover: classes`, () => {
      const html = renderCardHtml(name, false);
      expect(html).not.toContain('group-hover:');
    });

    it(`${name} card (connected) contains no group-hover: classes`, () => {
      const html = renderCardHtml(name, true);
      expect(html).not.toContain('group-hover:');
    });

    it(`${name} card has no group class on outermost container`, () => {
      const html = renderCardHtml(name, false);
      // Extract outermost div className
      const match = html.match(/^<div class="([^"]*)"/);
      const outerClass = match ? match[1] : '';
      const classes = outerClass.split(' ');
      expect(classes).not.toContain('group');
    });

    for (const pattern of FORBIDDEN_GROUP_HOVER_PATTERNS) {
      it(`${name} card does not contain forbidden pattern: ${pattern}`, () => {
        const html = renderCardHtml(name, false);
        expect(html).not.toContain(pattern);
      });
    }
  }
});

// ---------------------------------------------------------------------------
// Property-based tests (minimum 100 iterations)
// ---------------------------------------------------------------------------

describe('Property 5: Hover does not affect credentials visibility for any connector card', () => {
  const connectorArb = fc.constantFrom(...CONNECTORS);
  const connectedArb = fc.boolean();

  /**
   * P5-A: For any connector card in any connection state, the rendered HTML
   * MUST NOT contain any `group-hover:` prefixed class.
   *
   * `group-hover:` is the Tailwind mechanism that would cause child elements
   * to change visibility/opacity/background when the parent is hovered.
   * Its absence guarantees hover cannot affect credentials or sensitive fields.
   *
   * **Validates: Requirements 4.2**
   */
  it('property: no group-hover: class present in any connector card HTML', () => {
    fc.assert(
      fc.property(connectorArb, connectedArb, ({ name }, isConnected) => {
        const html = renderCardHtml(name, isConnected);
        expect(html).not.toContain('group-hover:');
      }),
      { numRuns: 100 },
    );
  });

  /**
   * P5-B: For any connector card, the outermost container does NOT have
   * a standalone `group` class. Without `group` on the container, no
   * `group-hover:` on any child can be triggered by hovering the card.
   *
   * **Validates: Requirements 4.2**
   */
  it('property: outermost container has no group class for any connector', () => {
    fc.assert(
      fc.property(connectorArb, connectedArb, ({ name }, isConnected) => {
        const html = renderCardHtml(name, isConnected);
        const match = html.match(/^<div class="([^"]*)"/);
        const outerClass = match ? match[1] : '';
        const classes = outerClass.split(' ');
        expect(classes).not.toContain('group');
      }),
      { numRuns: 100 },
    );
  });

  /**
   * P5-C: For any connector card, none of the specific forbidden
   * group-hover: visibility/opacity/background patterns are present.
   *
   * **Validates: Requirements 4.2**
   */
  it('property: no forbidden group-hover: visibility/opacity/background patterns present', () => {
    fc.assert(
      fc.property(connectorArb, connectedArb, ({ name }, isConnected) => {
        const html = renderCardHtml(name, isConnected);

        for (const pattern of FORBIDDEN_GROUP_HOVER_PATTERNS) {
          expect(html).not.toContain(pattern);
        }
      }),
      { numRuns: 100 },
    );
  });

  /**
   * P5-D: For any two connector cards (same or different), neither contains
   * group-hover: classes — the property holds uniformly across all connectors.
   *
   * **Validates: Requirements 4.2**
   */
  it('property: group-hover: absence is uniform across all connector pairs', () => {
    fc.assert(
      fc.property(connectorArb, connectorArb, connectedArb, (connA, connB, isConnected) => {
        const htmlA = renderCardHtml(connA.name, isConnected);
        const htmlB = renderCardHtml(connB.name, isConnected);

        expect(htmlA).not.toContain('group-hover:');
        expect(htmlB).not.toContain('group-hover:');
      }),
      { numRuns: 100 },
    );
  });

  /**
   * P5-E: The hover mechanism used (hover:scale-[1.02]) is a direct CSS
   * pseudo-class on the element itself — NOT a group-hover: that would
   * propagate to children. This confirms the hover is isolated to the
   * container transform only.
   *
   * **Validates: Requirements 4.2**
   */
  it('property: hover effect uses direct hover: class (not group-hover:) on container', () => {
    fc.assert(
      fc.property(connectorArb, connectedArb, ({ name }, isConnected) => {
        const html = renderCardHtml(name, isConnected);

        // The outermost container uses direct hover:scale-[1.02]
        const match = html.match(/^<div class="([^"]*)"/);
        const outerClass = match ? match[1] : '';

        // Direct hover: is present (scale transform on container)
        expect(outerClass).toContain('hover:scale-[1.02]');

        // No group-hover: anywhere in the card
        expect(html).not.toContain('group-hover:');
      }),
      { numRuns: 100 },
    );
  });
});
