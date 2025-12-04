// Citation Agent - Formats references and validates sources

export interface CitationParams {
  sources: Array<{
    title: string;
    url: string;
    snippet?: string;
    source?: string;
  }>;
  format?: 'apa' | 'mla' | 'chicago' | 'ieee';
}

export interface CitationResult {
  bibliography: string;
  inTextCitations: Array<{
    text: string;
    citation: string;
  }>;
  formattedSources: Array<{
    id: string;
    citation: string;
    url: string;
  }>;
}

export class CitationAgent {
  async formatCitations(params: CitationParams): Promise<CitationResult> {
    const { sources, format = 'apa' } = params;
    
    const formattedSources = sources.map((source, index) => {
      const citation = this.formatCitation(source, format, index + 1);
      return {
        id: `source-${index + 1}`,
        citation,
        url: source.url
      };
    });

    const bibliography = this.generateBibliography(formattedSources, format);
    const inTextCitations = this.generateInTextCitations(formattedSources, format);

    return {
      bibliography,
      inTextCitations,
      formattedSources
    };
  }

  private formatCitation(
    source: CitationParams['sources'][0],
    format: string,
    index: number
  ): string {
    switch (format) {
      case 'apa':
        return this.formatAPA(source, index);
      case 'mla':
        return this.formatMLA(source, index);
      case 'chicago':
        return this.formatChicago(source, index);
      case 'ieee':
        return this.formatIEEE(source, index);
      default:
        return this.formatAPA(source, index);
    }
  }

  private formatAPA(source: CitationParams['sources'][0], index: number): string {
    const domain = new URL(source.url).hostname.replace('www.', '');
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return `[${index}] ${source.title || 'Untitled'}. (${date}). Retrieved from ${source.url}`;
  }

  private formatMLA(source: CitationParams['sources'][0], index: number): string {
    const domain = new URL(source.url).hostname.replace('www.', '');
    const date = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    return `[${index}] "${source.title || 'Untitled'}." ${domain}, ${date}, ${source.url}`;
  }

  private formatChicago(source: CitationParams['sources'][0], index: number): string {
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return `${source.title || 'Untitled'}. Accessed ${date}. ${source.url}`;
  }

  private formatIEEE(source: CitationParams['sources'][0], index: number): string {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return `[${index}] ${source.title || 'Untitled'}, ${date}. [Online]. Available: ${source.url}`;
  }

  private generateBibliography(
    formattedSources: CitationResult['formattedSources'],
    format: string
  ): string {
    return `Bibliography (${format.toUpperCase()} Format)\n\n` +
      formattedSources.map(s => s.citation).join('\n\n');
  }

  private generateInTextCitations(
    formattedSources: CitationResult['formattedSources'],
    format: string
  ): Array<{ text: string; citation: string }> {
    return formattedSources.map((source, index) => {
      let citationText: string;
      
      switch (format) {
        case 'apa':
          citationText = `(${index + 1})`;
          break;
        case 'mla':
          citationText = `(${index + 1})`;
          break;
        case 'chicago':
          citationText = `[${index + 1}]`;
          break;
        case 'ieee':
          citationText = `[${index + 1}]`;
          break;
        default:
          citationText = `[${index + 1}]`;
      }

      return {
        text: source.citation,
        citation: citationText
      };
    });
  }

  validateSource(url: string): { valid: boolean; reason?: string } {
    try {
      new URL(url);
      return { valid: true };
    } catch {
      return { valid: false, reason: 'Invalid URL format' };
    }
  }
}

