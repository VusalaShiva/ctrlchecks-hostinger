import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { UserGuide } from './UserGuide';
import { cn } from '@/lib/utils';
import { getNodeGuide, hasNodeGuide } from './nodeGuides';
import { generateFieldGuide } from './guideGenerator';
import { resolveFieldHelp, type FieldHelpContent } from '@/lib/resolve-field-help-content';

// Detect guide type from field key or label
function detectGuideType(key: string, label: string, type?: string): 'api_key' | 'url' | 'credential' | 'token' | 'endpoint' | 'custom' {
  // ✅ PRODUCTION: Null-safe string operations
  const normalizedKey = key?.toLowerCase?.() ?? "";
  const normalizedLabel = label?.toLowerCase?.() ?? "";
  const lowerKey = normalizedKey;
  const lowerLabel = normalizedLabel;
  const combined = `${lowerKey} ${lowerLabel}`;

  // Check for specific services first (before generic types)
  if ((combined.includes('slack') && combined.includes('bot token')) || 
      (combined.includes('slack') && combined.includes('bot_token'))) {
    return 'custom'; // Use custom to trigger generateFieldGuide which has specific Slack guide
  }
  
  if (combined.includes('api key') || combined.includes('apikey') || combined.includes('api_key')) {
    return 'api_key';
  }
  if (combined.includes('url') || combined.includes('endpoint') || combined.includes('base url') || combined.includes('server url')) {
    return 'url';
  }
  if (combined.includes('token') || combined.includes('bearer') || combined.includes('access token')) {
    return 'token';
  }
  if (combined.includes('endpoint') || combined.includes('api endpoint')) {
    return 'endpoint';
  }
  if (combined.includes('credential') || combined.includes('password') || combined.includes('secret') || combined.includes('auth')) {
    return 'credential';
  }
  
  return 'custom';
}

// Generate guide question text
function getGuideQuestion(key: string, label: string): string {
  // ✅ PRODUCTION: Null-safe string operations
  const normalizedKey = key?.toLowerCase?.() ?? "";
  const normalizedLabel = label?.toLowerCase?.() ?? "";
  const lowerKey = normalizedKey;
  const lowerLabel = normalizedLabel;
  const combined = `${lowerKey} ${lowerLabel}`;

  if (combined.includes('api key') || combined.includes('apikey')) {
    return 'How to set API key?';
  }
  if (combined.includes('url') || combined.includes('endpoint')) {
    return 'How to set URL?';
  }
  if (combined.includes('token')) {
    return 'How to set Token?';
  }
  if (combined.includes('credential') || combined.includes('password') || combined.includes('secret')) {
    return 'How to set Credentials?';
  }
  if (combined.includes('operation') || combined.includes('type') || combined.includes('mode')) {
    return `How to choose ${label}?`;
  }
  
  return `How to set ${label}?`;
}

interface InputGuideLinkProps {
  fieldKey: string;
  fieldLabel: string;
  fieldType?: string;
  nodeType?: string;
  className?: string;
  placeholder?: string;
  helpText?: string; // Add helpText prop to use field's helpText if available
  helpCategory?: string;
  docsUrl?: string;
  exampleValue?: string;
  options?: Array<{ label: string; value: string } | string>;
  config?: Record<string, unknown>;
  resolvedHelpContent?: FieldHelpContent | null;
}

export function InputGuideLink({
  fieldKey,
  fieldLabel,
  fieldType,
  nodeType,
  className,
  placeholder,
  helpText,
  helpCategory,
  docsUrl,
  exampleValue,
  options,
  config,
  resolvedHelpContent,
}: InputGuideLinkProps) {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const resolvedHelp = resolvedHelpContent || (nodeType ? resolveFieldHelp({
    nodeType,
    fieldName: fieldKey,
    fieldKey,
    fieldLabel,
    fieldType,
    placeholder,
    helpText,
    helpCategory,
    docsUrl,
    exampleValue,
    options,
    config,
    operation: config?.operation,
    resource: config?.resource,
  }) : null);
  
  // Try to get node-specific guide first
  const resolvedHelpGuide = resolvedHelp ? fieldHelpContentToGuide(resolvedHelp, placeholder) : null;
  const nodeGuide = !resolvedHelpGuide && nodeType ? getNodeGuide(nodeType, fieldKey) : null;
  const helpTextGuide = !resolvedHelpGuide && helpText ? parseHelpTextToGuide(helpText, fieldLabel, fieldType, placeholder) : null;
  
  // Generate field guide if no node-specific guide or helpText guide exists
  // ALWAYS generate guide for Slack Bot Token to ensure correct guide is shown
  // ✅ PRODUCTION: Null-safe string operations
  const normalizedFieldLabel = fieldLabel?.toLowerCase?.() ?? "";
  const normalizedFieldKey = fieldKey?.toLowerCase?.() ?? "";
  const isSlackBotToken = (normalizedFieldLabel.includes('slack') && 
                           (normalizedFieldLabel.includes('bot token') || 
                            normalizedFieldLabel.includes('bot_token'))) ||
                          (normalizedFieldKey.includes('slack') && 
                           (normalizedFieldKey.includes('bot_token') || 
                            normalizedFieldKey.includes('bottoken')));
  
  const registryMeta =
    helpCategory && helpCategory !== 'none'
      ? { helpCategory, docsUrl, exampleValue }
      : undefined;
  const generatedGuide = !resolvedHelpGuide && !helpTextGuide && !nodeGuide ? generateFieldGuide(
    nodeType || '',
    fieldKey || '',
    fieldLabel || '',
    fieldType || 'text',
    placeholder || fieldLabel || '', // Use fieldLabel as fallback if placeholder not available
    registryMeta
  ) : null;
  
  // Fallback to generic guide type detection
  const guideType = detectGuideType(fieldKey, fieldLabel, fieldType);
  const guideQuestion =
    fieldType === 'select'
      ? `How to choose ${fieldLabel}?`
      : getGuideQuestion(fieldKey, fieldLabel);
  
  // Prefer the field's explicit guide. Node-specific and generated guides are fallbacks.
  const activeGuide = resolvedHelpGuide || helpTextGuide || nodeGuide || generatedGuide;

  // Always show guide link (per requirements: ALL fields must have guides)
  // If no node-specific guide exists, we'll use generic guide based on field type

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsGuideOpen(true);
        }}
        className={cn(
          "mt-1 ml-auto flex max-w-full min-w-0 items-center justify-end gap-1 overflow-hidden text-right text-xs text-muted-foreground/70 transition-colors hover:text-primary",
          className
        )}
        style={{ marginLeft: 'auto' }}
      >
        <HelpCircle className="h-3 w-3 shrink-0" />
        <span className="min-w-0 truncate">{guideQuestion}</span>
      </button>
      
      <UserGuide
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        guideType={activeGuide ? 'custom' : guideType}
        customTitle={activeGuide?.title}
        customSteps={activeGuide?.steps}
        customUrl={activeGuide?.url}
        customExample={activeGuide?.example}
        securityWarning={activeGuide?.securityWarning}
      />
    </>
  );
}

function fieldHelpContentToGuide(help: FieldHelpContent, placeholder?: string): { title: string; steps: string[]; url?: string; example?: string; securityWarning?: boolean } {
  const steps = help.description
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const securityWarning = /secure|secret|token|key/i.test(help.description);

  return {
    title: help.title,
    steps: steps.length ? steps : [help.description],
    example: help.example || placeholder,
    securityWarning,
  };
}

// Parse helpText into guide format
function parseHelpTextToGuide(helpText: string, fieldLabel: string, fieldType?: string, placeholder?: string): { title: string; steps: string[]; url?: string; example?: string; securityWarning?: boolean } | null {
  if (!helpText) return null;
  
  // Check if helpText starts with "How to get"
  const titleMatch = helpText.match(/^How to get ([^:]+)/i);
  const title = titleMatch
    ? `How to get ${titleMatch[1]}?`
    : fieldType === 'select'
      ? `How to choose ${fieldLabel}?`
      : `How to set ${fieldLabel}?`;
  
  // Extract steps (numbered with 1), 2), etc. or Step 1, Step 2, etc.)
  const steps: string[] = [];

  if (helpText.includes('\n')) {
    steps.push(
      ...helpText
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
    );
  }
  
  // First try: Split by numbered steps pattern "1)", "2)", etc.
  if (steps.length === 0 && helpText.includes(')')) {
    const stepParts = helpText.split(/(?=\d+\))/);
    for (const part of stepParts) {
      // Match pattern: "1) Text content"
      const stepMatch = part.match(/^(\d+)\)\s*(.+?)(?=\s*\d+\)|$)/s);
      if (stepMatch) {
        const stepNum = stepMatch[1];
        const stepText = stepMatch[2].trim();
        if (stepText && stepText.length > 0) {
          steps.push(`Step ${stepNum}: ${stepText}`);
        }
      }
    }
  }
  
  // Second try: Match "Step 1", "Step 2" format
  if (steps.length === 0 && helpText.includes('Step')) {
    const stepPattern = /Step\s+(\d+)[:\s]*([^\n]+?)(?=\s*Step\s+\d+|\s*$)/gi;
    let match;
    while ((match = stepPattern.exec(helpText)) !== null) {
      const stepNum = match[1];
      const stepText = match[2].trim();
      if (stepText && stepText.length > 0) {
        steps.push(`Step ${stepNum}: ${stepText}`);
      }
    }
  }
  
  // Third try: Match "1.", "2." format
  if (steps.length === 0 && helpText.match(/\d+\./)) {
    const stepPattern = /(\d+)\.\s*([^\n]+?)(?=\s*\d+\.|\s*$)/g;
    let match;
    while ((match = stepPattern.exec(helpText)) !== null) {
      const stepNum = match[1];
      const stepText = match[2].trim();
      if (stepText && stepText.length > 0) {
        steps.push(`Step ${stepNum}: ${stepText}`);
      }
    }
  }
  
  // Last resort: Split by newlines and number them
  if (steps.length === 0) {
    const lines = helpText.split('\n').filter(line => {
      const trimmed = line.trim();
      return trimmed.length > 0 && 
             !trimmed.toLowerCase().startsWith('how to get') &&
             !trimmed.toLowerCase().startsWith('example') &&
             !trimmed.toLowerCase().startsWith('note');
    });
    lines.forEach((line, index) => {
      if (line.trim()) {
        steps.push(`Step ${index + 1}: ${line.trim()}`);
      }
    });
  }
  
  // If no numbered steps found, split by newlines and format
  if (steps.length === 0) {
    const lines = helpText.split('\n').filter(line => line.trim());
    lines.forEach((line, index) => {
      if (line.trim() && !line.toLowerCase().startsWith('how to get')) {
        steps.push(`Step ${index + 1}: ${line.trim()}`);
      }
    });
  }
  
  // Extract example if present
  const exampleMatch = helpText.match(/Example[:\s]+([^\n]+)/i);
  const example = exampleMatch ? exampleMatch[1].trim() : placeholder;
  
  // Extract URL if present
  const urlMatch = helpText.match(/https?:\/\/[^\s]+/);
  const url = urlMatch ? urlMatch[0] : undefined;
  
  // Check for security warning
  const securityWarning = helpText.toLowerCase().includes('secure') || 
                         helpText.toLowerCase().includes('secret') ||
                         helpText.toLowerCase().includes('token') ||
                         helpText.toLowerCase().includes('key');
  
  if (steps.length === 0) {
    steps.push(helpText);
  }
  
  return {
    title,
    steps,
    url,
    example,
    securityWarning
  };
}

// Helper to determine if we should show generic guide
// MANDATORY: Show guide for ALL input fields (per requirements)
function shouldShowGenericGuide(fieldKey: string, fieldLabel: string): boolean {
  // Always show guide for all fields - zero confusion requirement
  return true;
}

