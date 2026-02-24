/**
 * Test Data Manager
 *
 * Reads and resolves test data from JSON files in the project's testdata directory.
 * Supports environment-specific data overrides and dynamic value generation.
 */

import * as fs from 'fs';
import * as path from 'path';

export type TestDataRecord = Record<string, any>;

export class TestDataManager {
  private cache: Map<string, TestDataRecord> = new Map();
  private dataBasePath: string;

  constructor(dataBasePath?: string) {
    this.dataBasePath = dataBasePath || path.resolve(process.cwd(), 'src/project/testdata');
  }

  /**
   * Load a test data file by name (without extension).
   */
  loadData(fileName: string): TestDataRecord {
    if (this.cache.has(fileName)) {
      return this.cache.get(fileName)!;
    }

    const filePath = path.join(this.dataBasePath, `${fileName}.json`);

    if (!fs.existsSync(filePath)) {
      throw new Error(
        `[TestDataManager] Test data file not found: "${fileName}". Expected at: ${filePath}`
      );
    }

    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data: TestDataRecord = JSON.parse(raw);
      this.cache.set(fileName, data);
      return data;
    } catch (error) {
      throw new Error(
        `[TestDataManager] Failed to parse test data file "${fileName}": ${(error as Error).message}`
      );
    }
  }

  /**
   * Get a specific value from a data file using a dot-notation key path.
   * Example: getValue("login", "validUser.username")
   */
  getValue(fileName: string, keyPath: string): any {
    const data = this.loadData(fileName);
    const keys = keyPath.split('.');
    let current: any = data;

    for (const key of keys) {
      if (current === undefined || current === null) {
        throw new Error(
          `[TestDataManager] Key path "${keyPath}" not found in file "${fileName}". ` +
          `Failed at key "${key}".`
        );
      }
      current = current[key];
    }

    if (current === undefined) {
      throw new Error(
        `[TestDataManager] Key path "${keyPath}" resolved to undefined in file "${fileName}".`
      );
    }

    return current;
  }

  /**
   * Resolve dynamic placeholders in a value string.
   * Supports: {{timestamp}}, {{random}}, {{env:VAR_NAME}}, {{data:file.keyPath}}
   */
  resolveDynamicValue(value: string): string {
    return value.replace(/\{\{(\w+)(?::([^}]+))?\}\}/g, (match, type, param) => {
      switch (type) {
        case 'timestamp':
          return Date.now().toString();
        case 'random':
          return Math.random().toString(36).substring(2, 10);
        case 'env':
          return process.env[param] || '';
        case 'data':
          if (param) {
            const [file, ...keyParts] = param.split('.');
            return String(this.getValue(file, keyParts.join('.')));
          }
          return match;
        default:
          return match;
      }
    });
  }

  /**
   * Clear the data cache.
   */
  clearCache(): void {
    this.cache.clear();
  }
}
