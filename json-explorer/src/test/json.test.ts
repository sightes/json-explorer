import { describe, it, expect } from 'vitest';

function getType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  return 'null';
}

function buildTree(key: string, value: unknown, path: string): { key: string; value: unknown; type: string; path: string; children?: unknown[] } {
  const currentPath = path ? `${path}.${key}` : key;
  const type = getType(value);

  const node = { key, value, type, path: currentPath };

  if (type === 'object' && value !== null) {
    node.children = Object.entries(value as Record<string, unknown>).map(([k, v]) =>
      buildTree(k, v, currentPath)
    );
  } else if (type === 'array') {
    node.children = (value as unknown[]).map((item, index) =>
      buildTree(`[${index}]`, item, currentPath)
    );
  }

  return node;
}

function parseJSON(input: string): { data: unknown; error: string | null } {
  if (!input.trim()) {
    return { data: null, error: 'Please enter some JSON' };
  }

  try {
    const parsed = JSON.parse(input);
    const data = buildTree('root', parsed, '');
    return { data, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Invalid JSON';
    return { data: null, error };
  }
}

describe('getType', () => {
  it('returns string for string values', () => {
    expect(getType('hello')).toBe('string');
  });

  it('returns number for numeric values', () => {
    expect(getType(42)).toBe('number');
    expect(getType(3.14)).toBe('number');
  });

  it('returns boolean for boolean values', () => {
    expect(getType(true)).toBe('boolean');
    expect(getType(false)).toBe('boolean');
  });

  it('returns null for null', () => {
    expect(getType(null)).toBe('null');
  });

  it('returns array for arrays', () => {
    expect(getType([])).toBe('array');
    expect(getType([1, 2, 3])).toBe('array');
  });

  it('returns object for plain objects', () => {
    expect(getType({})).toBe('object');
    expect(getType({ key: 'value' })).toBe('object');
  });
});

describe('buildTree', () => {
  it('creates a node with key, value, type and path', () => {
    const node = buildTree('name', 'John', '');
    expect(node.key).toBe('name');
    expect(node.value).toBe('John');
    expect(node.type).toBe('string');
    expect(node.path).toBe('name');
  });

  it('builds children for objects', () => {
    const node = buildTree('user', { name: 'John', age: 30 }, '');
    expect(node.children).toHaveLength(2);
    expect(node.children![0].key).toBe('name');
    expect(node.children![1].key).toBe('age');
  });

  it('builds children for arrays with index keys', () => {
    const node = buildTree('items', ['a', 'b', 'c'], '');
    expect(node.children).toHaveLength(3);
    expect(node.children![0].key).toBe('[0]');
    expect(node.children![1].key).toBe('[1]');
    expect(node.children![2].key).toBe('[2]');
  });

  it('creates correct nested paths', () => {
    const node = buildTree('user', { address: { city: 'NYC' } }, '');
    const addressNode = node.children!.find(c => c.key === 'address') as { children?: unknown[] };
    const cityNode = addressNode.children!.find(c => c.key === 'city');
    expect(cityNode.path).toBe('user.address.city');
  });
});

describe('parseJSON', () => {
  it('returns error for empty input', () => {
    const result = parseJSON('');
    expect(result.error).toBe('Please enter some JSON');
    expect(result.data).toBeNull();
  });

  it('returns error for whitespace only', () => {
    const result = parseJSON('   ');
    expect(result.error).toBe('Please enter some JSON');
  });

  it('parses valid JSON object', () => {
    const result = parseJSON('{"name":"John"}');
    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
    expect(result.data.key).toBe('root');
  });

  it('parses valid JSON array', () => {
    const result = parseJSON('[1, 2, 3]');
    expect(result.error).toBeNull();
    expect(result.data.type).toBe('array');
  });

  it('returns error for invalid JSON', () => {
    const result = parseJSON('{ invalid }');
    expect(result.error).toBeDefined();
    expect(result.data).toBeNull();
  });

  it('returns error for JSON with trailing comma', () => {
    const result = parseJSON('{"a": 1,}');
    expect(result.error).toBeDefined();
  });
});