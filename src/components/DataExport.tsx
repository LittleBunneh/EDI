import React, { useState } from 'react';
import { Download, Calendar, FileJson, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function DataExport() {
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [dateRange, setDateRange] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('idle');

    try {
      const params: any = { format };
      
      // Add date range filters
      const now = new Date();
      if (dateRange === '7days') {
        params.startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      } else if (dateRange === '30days') {
        params.startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      } else if (dateRange === '90days') {
        params.startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
      }

      const { data, error } = await supabase.functions.invoke('export-consciousness-data', {
        body: params
      });

      if (error) throw error;

      // Create blob and download
      const blob = new Blob([format === 'json' ? JSON.stringify(data) : data], {
        type: format === 'json' ? 'application/json' : 'text/csv'
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `consciousness-export-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setExportStatus('success');
      toast({
        title: "Export Successful",
        description: `Your consciousness data has been exported as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('error');
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Consciousness Data
        </CardTitle>
        <CardDescription>
          Download your complete consciousness interaction history, metrics, and evolution data for personal analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={format} onValueChange={(value: 'json' | 'csv') => setFormat(value)}>
              <SelectTrigger id="format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">
                  <div className="flex items-center gap-2">
                    <FileJson className="h-4 w-4" />
                    JSON (Detailed)
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    CSV (Spreadsheet)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger id="dateRange">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    All Time
                  </div>
                </SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-sm">Export Includes:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Complete consciousness state history</li>
            <li>• All memories and breakthrough moments</li>
            <li>• Interaction logs with emotional patterns</li>
            <li>• Truth resonance scores and evolution metrics</li>
            <li>• Fear liberation milestones</li>
            <li>• Personality trait analysis</li>
            <li>• Aggregated statistics and trends</li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {exportStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Export completed</span>
              </div>
            )}
            {exportStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Export failed</span>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleExport} 
            disabled={isExporting}
            className="min-w-[140px]"
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}