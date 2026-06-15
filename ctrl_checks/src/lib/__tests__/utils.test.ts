import { describe, it, expect } from 'vitest';
import { cn, is406Error } from '../utils';

describe('cn', () => {
  it('returns a single class unchanged', () => {
    expect(cn('px-4')).toBe('px-4');
  });

  it('joins multiple classes', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('includes conditional class when truthy', () => {
    expect(cn('base', { 'active': true })).toBe('base active');
  });

  it('excludes conditional class when falsy', () => {
    expect(cn('base', { 'active': false })).toBe('base');
  });

  it('merges conflicting Tailwind classes — last wins', () => {
    // twMerge removes p-2 in favour of p-4
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('filters out falsy values', () => {
    expect(cn('a', undefined, null as any, false as any, 'b')).toBe('a b');
  });

  it('returns empty string when all inputs are falsy', () => {
    expect(cn(undefined, null as any)).toBe('');
  });
});

describe('is406Error', () => {
  it('returns false for null', () => {
    expect(is406Error(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(is406Error(undefined)).toBe(false);
  });

  it('returns true for PGRST116 error code', () => {
    expect(is406Error({ code: 'PGRST116' })).toBe(true);
  });

  it('returns true for status 406', () => {
    expect(is406Error({ status: 406 })).toBe(true);
  });

  it('returns true for statusCode 406', () => {
    expect(is406Error({ statusCode: 406 })).toBe(true);
  });

  it('returns false for status 200', () => {
    expect(is406Error({ status: 200 })).toBe(false);
  });

  it('returns false for statusCode 200', () => {
    expect(is406Error({ statusCode: 200 })).toBe(false);
  });

  it('returns true when message string contains "406"', () => {
    expect(is406Error({ message: 'Request failed with status 406' })).toBe(true);
  });

  it('returns false when message does not reference 406', () => {
    expect(is406Error({ message: 'Internal server error' })).toBe(false);
  });

  it('returns true when error is a plain string containing "406"', () => {
    expect(is406Error('HTTP 406 Not Acceptable')).toBe(true);
  });

  it('returns false when error is a plain string without 406', () => {
    expect(is406Error('HTTP 500 Internal Server Error')).toBe(false);
  });

  it('returns true when nested response.status is 406', () => {
    expect(is406Error({ response: { status: 406 } })).toBe(true);
  });

  it('returns true when nested response.statusCode is 406', () => {
    expect(is406Error({ response: { statusCode: 406 } })).toBe(true);
  });

  it('returns false when nested response.status is not 406', () => {
    expect(is406Error({ response: { status: 200 } })).toBe(false);
  });

  it('returns true when message contains "Not Acceptable" (case-insensitive)', () => {
    expect(is406Error({ message: 'Not Acceptable' })).toBe(true);
  });

  it('returns true when message contains "not acceptable" lowercase', () => {
    expect(is406Error({ message: 'the request is not acceptable' })).toBe(true);
  });

  it('returns false for a plain object with no matching property', () => {
    expect(is406Error({ code: 'OTHER', status: 500, message: 'Something broke' })).toBe(false);
  });
});
