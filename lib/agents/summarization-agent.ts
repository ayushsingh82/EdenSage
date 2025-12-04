// Summarization Agent - Creates comprehensive summaries and reports

export interface SummaryParams {
  analysis: {
    keyPoints: string[];
    trends: string[];
    statistics: Record<string, any>;
    insights: string[];
  };
  originalQuery: string;
  format?: 'executive' | 'detailed' | 'brief';
}

export interface SummaryResult {
  executiveSummary: string;
  detailedReport: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  wordCount: number;
}

export class SummarizationAgent {
  async generateSummary(params: SummaryParams): Promise<SummaryResult> {
    const { analysis, originalQuery, format = 'detailed' } = params;
    
    // Generate executive summary
    const executiveSummary = this.generateExecutiveSummary(analysis, originalQuery);
    
    // Generate detailed report
    const detailedReport = this.generateDetailedReport(analysis, originalQuery, format);
    
    // Generate structured sections
    const sections = this.generateSections(analysis);
    
    return {
      executiveSummary,
      detailedReport,
      sections,
      wordCount: detailedReport.split(/\s+/).length
    };
  }

  private generateExecutiveSummary(
    analysis: SummaryParams['analysis'],
    query: string
  ): string {
    return `Executive Summary

Research Query: ${query}

This report analyzes information gathered from multiple sources regarding "${query}". 

Key Findings:
${analysis.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

Trends Identified:
${analysis.trends.map(trend => `• ${trend}`).join('\n')}

Insights:
${analysis.insights.join('\n')}

Confidence Level: ${(analysis.insights.length > 0 ? 85 : 70)}%`;
  }

  private generateDetailedReport(
    analysis: SummaryParams['analysis'],
    query: string,
    format: string
  ): string {
    const sections = [
      `Research Report: ${query}`,
      '\n=== INTRODUCTION ===',
      `This comprehensive report presents findings from an analysis of multiple sources related to "${query}".`,
      '\n=== KEY POINTS ===',
      ...analysis.keyPoints.map((point, i) => `${i + 1}. ${point}`),
      '\n=== TRENDS AND PATTERNS ===',
      ...analysis.trends.map(trend => `• ${trend}`),
    ];

    if (Object.keys(analysis.statistics).length > 0) {
      sections.push('\n=== STATISTICS ===');
      sections.push(JSON.stringify(analysis.statistics, null, 2));
    }

    sections.push('\n=== INSIGHTS ===');
    sections.push(...analysis.insights);

    sections.push('\n=== CONCLUSION ===');
    sections.push(`Based on the analysis of ${analysis.keyPoints.length} key findings and ${analysis.trends.length} identified trends, this report provides a comprehensive overview of "${query}".`);

    return sections.join('\n');
  }

  private generateSections(
    analysis: SummaryParams['analysis']
  ): Array<{ title: string; content: string }> {
    return [
      {
        title: 'Key Findings',
        content: analysis.keyPoints.join('\n\n')
      },
      {
        title: 'Trends',
        content: analysis.trends.map(t => `• ${t}`).join('\n')
      },
      {
        title: 'Insights',
        content: analysis.insights.join('\n\n')
      }
    ];
  }
}

