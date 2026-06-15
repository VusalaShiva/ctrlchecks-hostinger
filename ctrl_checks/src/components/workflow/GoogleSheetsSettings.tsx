import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useRole } from '@/hooks/useRole';
import { InputGuideLink } from './InputGuideLink';

interface GoogleSheetsSettingsProps {
  config: Record<string, unknown>;
  onConfigChange: (config: Record<string, unknown>) => void;
}

export default function GoogleSheetsSettings({ config, onConfigChange }: GoogleSheetsSettingsProps) {
  const { isAdmin } = useRole();
  const guides = {
    operation: [
      'What this field is: This chooses what Google Sheets will do in this workflow step.',
      'How to fill it: Choose Read to get rows, Write to replace cells, Append to add new rows at the bottom, or Update to change existing cells.',
      'Example: Choose Read when you want to fetch customer rows before sending emails.',
    ].join('\n'),
    spreadsheetId: [
      'What this field is: This is the unique ID of the Google Sheet file.',
      'Where to find it: Open the spreadsheet in your browser and copy the long text between /d/ and /edit in the URL.',
      'Format: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit',
      'Example: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    ].join('\n'),
    sheetName: [
      'What this field is: This is the tab name at the bottom of your spreadsheet.',
      'How to fill it: Type the tab name exactly as it appears, including spaces and capitalization.',
      'Example: FoodSales',
      'Tip: Leave it empty only when you want CtrlChecks to use the first tab in the spreadsheet.',
    ].join('\n'),
    range: [
      'What this field is: This tells CtrlChecks which cells to read or write.',
      'Format: Use A1 notation. A1:D100 means columns A through D and rows 1 through 100.',
      'With sheet name: FoodSales!A1:D100',
      'Example: A1:D100',
      'Tip: For reading, leave it empty to read all used cells. For writing or updating, enter the exact target range.',
    ].join('\n'),
    outputFormat: [
      'What this field is: This controls the shape of the data that comes out of the Google Sheets Read operation.',
      'Choose JSON Array when each row should become an object. This is best for most workflows, such as sending one email per row.',
      'Choose Key-Value Pairs when you want a simple object of column names and values.',
      'Choose Plain Text Table when you want the rows formatted as readable text for an email, Slack message, or AI prompt.',
      'Example: If your sheet has Name and Email columns, JSON Array returns rows like [{"Name":"Alice","Email":"alice@example.com"}].',
      'Recommended: Use JSON Array unless you specifically need text.',
    ].join('\n'),
    readDirection: [
      'What this field is: This tells CtrlChecks whether your data is organized by rows or by columns.',
      'Choose Row-wise when each row is one record, such as one customer, order, or lead. This is the normal spreadsheet format.',
      'Choose Column-wise when each column is one record and values go downward.',
      'Example: Use Row-wise for a sheet with columns Name, Email, and Status.',
      'Recommended: Use Row-wise unless your sheet is intentionally built column-by-column.',
    ].join('\n'),
    data: [
      'What this field is: This is the data that CtrlChecks will write into the sheet.',
      'How to fill it: Enter JSON as rows. Each inner list is one spreadsheet row.',
      'Example: [["Name","Email"],["Alice","alice@example.com"]]',
      'Dynamic example: Use {{$json.rows}} when an earlier node already produced rows.',
    ].join('\n'),
    allowWrite: [
      'What this field is: This controls whether this Google Sheets node is allowed to write or update sheet data.',
      'How to fill it: Turn it on only when this workflow should change the spreadsheet.',
      'Example: Turn it on for Append, Write, or Update operations. Leave it off for Read-only workflows.',
    ].join('\n'),
  };

  const updateConfig = (key: string, value: unknown) => {
    if (key === 'data') {
      const rest = { ...config };
      delete rest.values;
      onConfigChange({
        ...rest,
        data: value,
      });
      return;
    }

    onConfigChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4">

      {/* Operation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="operation">Operation</Label>
          <InputGuideLink
            fieldKey="operation"
            fieldLabel="Operation"
            fieldType="select"
            nodeType="google_sheets"
            helpCategory="operation_select"
            helpText={guides.operation}
            placeholder="read"
            className="mt-0"
          />
        </div>
        <Select
          value={(config.operation as string) || 'read'}
          onValueChange={(value) => updateConfig('operation', value)}
        >
          <SelectTrigger id="operation">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="write">Write</SelectItem>
            <SelectItem value="append">Append</SelectItem>
            <SelectItem value="update">Update</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Spreadsheet ID */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="spreadsheetId">
            Spreadsheet ID <span className="text-destructive">*</span>
          </Label>
          <InputGuideLink
            fieldKey="spreadsheetId"
            fieldLabel="Spreadsheet ID"
            fieldType="text"
            nodeType="google_sheets"
            helpCategory="spreadsheet_id"
            docsUrl="https://docs.google.com/spreadsheets"
            helpText={guides.spreadsheetId}
            placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            className="mt-0"
          />
        </div>
        <Input
          id="spreadsheetId"
          value={(config.spreadsheetId as string) || ''}
          onChange={(e) => updateConfig('spreadsheetId', e.target.value)}
          placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
        />
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Get this from the Google Sheets URL: /d/SPREADSHEET_ID/edit
          </p>
        </div>
      </div>

      {/* Sheet Name */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="sheetName">Sheet Name (Tab)</Label>
          <InputGuideLink
            fieldKey="sheetName"
            fieldLabel="Sheet Name (Tab)"
            fieldType="text"
            nodeType="google_sheets"
            helpText={guides.sheetName}
            placeholder="FoodSales"
            className="mt-0"
          />
        </div>
        <Input
          id="sheetName"
          value={(config.sheetName as string) || ''}
          onChange={(e) => updateConfig('sheetName', e.target.value)}
          placeholder="Sheet1"
        />
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Leave empty to use the first sheet
          </p>
        </div>
      </div>

      {/* Range */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="range">Range (e.g., A1:D100)</Label>
          <InputGuideLink
            fieldKey="range"
            fieldLabel="Range (A1 notation)"
            fieldType="text"
            nodeType="google_sheets"
            helpText={guides.range}
            placeholder="A1:D100"
            className="mt-0"
          />
        </div>
        <Input
          id="range"
          value={(config.range as string) || ''}
          onChange={(e) => updateConfig('range', e.target.value)}
          placeholder="A1:D100"
        />
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Leave empty to read all used cells. For write/update, specify the target range.
          </p>
        </div>
      </div>

      {/* Output Format (for read operations) */}
      {(config.operation === 'read' || !config.operation) && (
        <>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="outputFormat">Output Format</Label>
              <InputGuideLink
                fieldKey="outputFormat"
                fieldLabel="Output Format"
                fieldType="select"
                nodeType="google_sheets"
                helpCategory="resource_select"
                helpText={guides.outputFormat}
                placeholder="JSON Array"
                className="mt-0"
              />
            </div>
            <Select
              value={(config.outputFormat as string) || 'json'}
              onValueChange={(value) => updateConfig('outputFormat', value)}
            >
              <SelectTrigger id="outputFormat">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON Array</SelectItem>
                <SelectItem value="keyvalue">Key-Value Pairs</SelectItem>
                <SelectItem value="text">Plain Text Table</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="readDirection">Read Direction</Label>
              <InputGuideLink
                fieldKey="readDirection"
                fieldLabel="Read Direction"
                fieldType="select"
                nodeType="google_sheets"
                helpCategory="resource_select"
                helpText={guides.readDirection}
                placeholder="Row-wise (default)"
                className="mt-0"
              />
            </div>
            <Select
              value={(config.readDirection as string) || 'rows'}
              onValueChange={(value) => updateConfig('readDirection', value)}
            >
              <SelectTrigger id="readDirection">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rows">Row-wise (default)</SelectItem>
                <SelectItem value="columns">Column-wise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Data to Write (for write operations) */}
      {(config.operation === 'write' || config.operation === 'append' || config.operation === 'update') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="data">
              Data to Write (JSON) <span className="text-destructive">*</span>
            </Label>
            <InputGuideLink
              fieldKey="data"
              fieldLabel="Data to Write (JSON)"
              fieldType="json"
              nodeType="google_sheets"
              helpCategory="json_payload"
              helpText={guides.data}
              placeholder={'[["Name","Email"],["Alice","alice@example.com"]]'}
              className="mt-0"
            />
          </div>
          <Textarea
            id="data"
            value={typeof config.data === 'string' ? config.data : JSON.stringify(config.data || [], null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                updateConfig('data', parsed);
              } catch {
                updateConfig('data', e.target.value);
              }
            }}
            placeholder={
              config.operation === 'append'
                ? '[["New Value 1", "New Value 2"]]'
                : '[["Header1", "Header2"], ["Value1", "Value2"]]'
            }
            rows={6}
            className="font-mono text-sm"
          />
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              {config.operation === 'append'
                ? 'Enter values to append as new rows: [["val1", "val2"]]'
                : 'Enter headers and values to overwrite: [["Header", "Header"], ["val1", "val2"]]'}
            </p>
          </div>
        </div>
      )}

      {/* Allow Write Access (Admin only) */}
      {isAdmin && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="allowWrite">Allow Write Access</Label>
            <InputGuideLink
              fieldKey="allowWrite"
              fieldLabel="Allow Write Access"
              fieldType="boolean"
              nodeType="google_sheets"
              helpText={guides.allowWrite}
              placeholder="Off for read-only, on for writes"
              className="mt-0"
            />
            <Switch
              id="allowWrite"
              checked={(config.allowWrite as boolean) || false}
              onCheckedChange={(checked) => updateConfig('allowWrite', checked)}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              ⚠️ Admin only: Enable write/update operations for this node
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

