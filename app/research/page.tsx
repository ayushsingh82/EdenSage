'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ResearchResult {
  query: string;
  searchResults: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
  analysis: {
    keyPoints: string[];
    trends: string[];
    insights: string[];
    confidence: number;
  };
  summary: {
    executiveSummary: string;
    detailedReport: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
    wordCount: number;
  };
  citations: {
    bibliography: string;
    formattedSources: Array<{
      id: string;
      citation: string;
      url: string;
    }>;
  };
}

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [focusAreas, setFocusAreas] = useState('');
  const [citationFormat, setCitationFormat] = useState<'apa' | 'mla' | 'chicago' | 'ieee'>('apa');
  const [maxSources, setMaxSources] = useState(5);
  const [activeTab, setActiveTab] = useState<'summary' | 'analysis' | 'sources' | 'citations'>('summary');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: 'tools/call',
          params: {
            name: 'conductResearch',
            arguments: {
              query: query.trim(),
              focusAreas: focusAreas.split(',').map(a => a.trim()).filter(Boolean),
              maxSources,
              citationFormat,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to conduct research');
      }

      const data = await response.json();
      const researchResult = JSON.parse(data.content[0].text);
      setResult(researchResult);
    } catch (err: any) {
      setError(err.message || 'An error occurred while conducting research');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg)'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100
      }}>
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'var(--orange)',
          textShadow: '0 0 10px var(--orange-glow)',
          textDecoration: 'none'
        }}>
          EdenSage
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--orange)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text)'}>
            Home
          </Link>
        </div>
      </nav>

      <div style={{ 
        padding: '2rem',
        paddingTop: '6rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'var(--gradient-fire)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Research Orchestrator
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Coordinate multiple AI agents to conduct comprehensive research, analyze data, and generate reports
          </p>
        </div>

        {/* Research Form */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                color: 'var(--text-bright)',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                Research Query
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., Impact of AI on healthcare costs"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  color: 'var(--text)',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--orange)';
                  e.target.style.outline = 'none';
                }}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--text-bright)',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  Focus Areas (comma-separated)
                </label>
                <input
                  type="text"
                  value={focusAreas}
                  onChange={(e) => setFocusAreas(e.target.value)}
                  placeholder="cost reduction, patient outcomes"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--orange)';
                    e.target.style.outline = 'none';
                  }}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--text-bright)',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  Max Sources
                </label>
                <input
                  type="number"
                  value={maxSources}
                  onChange={(e) => setMaxSources(parseInt(e.target.value) || 5)}
                  min="1"
                  max="20"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--orange)';
                    e.target.style.outline = 'none';
                  }}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--text-bright)',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  Citation Format
                </label>
                <select
                  value={citationFormat}
                  onChange={(e) => setCitationFormat(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--orange)';
                    e.target.style.outline = 'none';
                  }}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                >
                  <option value="apa">APA</option>
                  <option value="mla">MLA</option>
                  <option value="chicago">Chicago</option>
                  <option value="ieee">IEEE</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              style={{
                width: '100%',
                padding: '1rem',
                background: loading ? 'var(--bg-elevated)' : 'var(--gradient-fire)',
                border: 'none',
                borderRadius: '4px',
                color: 'var(--bg)',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading || !query.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !query.trim() ? 0.6 : 1,
                transition: 'all 0.3s',
                boxShadow: loading ? 'none' : 'var(--glow-orange)'
              }}
            >
              {loading ? '🔄 Conducting Research...' : '🚀 Start Research'}
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '3rem',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '3px solid var(--border)',
                borderTopColor: 'var(--orange)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <div>
                <p style={{ color: 'var(--text-bright)', marginBottom: '0.5rem' }}>
                  Orchestrating Research Agents...
                </p>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>🔍 Searching...</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>📊 Analyzing...</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>📝 Summarizing...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--red)',
            borderRadius: '8px',
            padding: '1.5rem',
            color: 'var(--red)',
            marginBottom: '2rem'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '2rem',
              borderBottom: '1px solid var(--border)'
            }}>
              {[
                { id: 'summary' as const, label: '📄 Summary' },
                { id: 'analysis' as const, label: '📊 Analysis' },
                { id: 'sources' as const, label: '🔍 Sources' },
                { id: 'citations' as const, label: '📚 Citations' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '1rem 1.5rem',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid var(--orange)' : '2px solid transparent',
                    color: activeTab === tab.id ? 'var(--orange)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: activeTab === tab.id ? '600' : '400',
                    transition: 'all 0.3s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2rem',
              minHeight: '400px'
            }}>
              {activeTab === 'summary' && (
                <div>
                  <h2 style={{
                    color: 'var(--text-bright)',
                    fontSize: '1.5rem',
                    marginBottom: '1rem'
                  }}>
                    Executive Summary
                  </h2>
                  <div style={{
                    color: 'var(--text)',
                    lineHeight: '1.8',
                    whiteSpace: 'pre-wrap',
                    marginBottom: '2rem'
                  }}>
                    {result.summary.executiveSummary}
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--bg)',
                    borderRadius: '4px',
                    border: '1px solid var(--border)'
                  }}>
                    <strong style={{ color: 'var(--orange)' }}>Word Count:</strong>{' '}
                    <span style={{ color: 'var(--text-muted)' }}>{result.summary.wordCount}</span>
                  </div>
                </div>
              )}

              {activeTab === 'analysis' && (
                <div>
                  <h2 style={{
                    color: 'var(--text-bright)',
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    Research Analysis
                  </h2>

                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      color: 'var(--orange)',
                      fontSize: '1.2rem',
                      marginBottom: '1rem'
                    }}>
                      Key Points
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {result.analysis.keyPoints.map((point, i) => (
                        <li key={i} style={{
                          padding: '0.75rem',
                          marginBottom: '0.5rem',
                          background: 'var(--bg)',
                          borderLeft: '3px solid var(--orange)',
                          color: 'var(--text)'
                        }}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      color: 'var(--orange)',
                      fontSize: '1.2rem',
                      marginBottom: '1rem'
                    }}>
                      Trends Identified
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {result.analysis.trends.map((trend, i) => (
                        <span key={i} style={{
                          padding: '0.5rem 1rem',
                          background: 'var(--bg)',
                          border: '1px solid var(--orange)',
                          borderRadius: '4px',
                          color: 'var(--orange)',
                          fontSize: '0.9rem'
                        }}>
                          {trend}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{
                      color: 'var(--orange)',
                      fontSize: '1.2rem',
                      marginBottom: '1rem'
                    }}>
                      Insights
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {result.analysis.insights.map((insight, i) => (
                        <li key={i} style={{
                          padding: '0.75rem',
                          marginBottom: '0.5rem',
                          background: 'var(--bg)',
                          color: 'var(--text)',
                          borderRadius: '4px'
                        }}>
                          💡 {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'var(--bg)',
                    borderRadius: '4px',
                    border: '1px solid var(--border)'
                  }}>
                    <strong style={{ color: 'var(--orange)' }}>Confidence Level:</strong>{' '}
                    <span style={{ color: 'var(--text-muted)' }}>
                      {Math.round(result.analysis.confidence * 100)}%
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'sources' && (
                <div>
                  <h2 style={{
                    color: 'var(--text-bright)',
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    Search Results ({result.searchResults.length} sources)
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {result.searchResults.map((source, i) => (
                      <div key={i} style={{
                        padding: '1.5rem',
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        transition: 'border-color 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--orange)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                      >
                        <h3 style={{
                          color: 'var(--orange)',
                          fontSize: '1.1rem',
                          marginBottom: '0.5rem'
                        }}>
                          {source.title}
                        </h3>
                        <p style={{
                          color: 'var(--text-muted)',
                          marginBottom: '0.5rem',
                          lineHeight: '1.6'
                        }}>
                          {source.snippet}
                        </p>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--orange)',
                            fontSize: '0.9rem',
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        >
                          {source.url} →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'citations' && (
                <div>
                  <h2 style={{
                    color: 'var(--text-bright)',
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    Bibliography ({citationFormat.toUpperCase()} Format)
                  </h2>
                  <div style={{
                    background: 'var(--bg)',
                    padding: '1.5rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    marginBottom: '2rem'
                  }}>
                    <pre style={{
                      color: 'var(--text)',
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'inherit',
                      lineHeight: '1.8',
                      margin: 0
                    }}>
                      {result.citations.bibliography}
                    </pre>
                  </div>
                  <h3 style={{
                    color: 'var(--orange)',
                    fontSize: '1.2rem',
                    marginBottom: '1rem'
                  }}>
                    Formatted Sources
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {result.citations.formattedSources.map((source, i) => (
                      <div key={source.id} style={{
                        padding: '1rem',
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        color: 'var(--text)'
                      }}>
                        <span style={{ color: 'var(--orange)', marginRight: '0.5rem' }}>
                          [{i + 1}]
                        </span>
                        {source.citation}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Agent Info */}
        {!loading && !result && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: 'var(--text-bright)',
              fontSize: '1.5rem',
              marginBottom: '1rem'
            }}>
              Multi-Agent Research System
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              This system coordinates multiple specialized AI agents to provide comprehensive research:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {[
                { name: 'Web Search Agent', icon: '🔍', desc: 'Finds relevant information' },
                { name: 'Data Analysis Agent', icon: '📊', desc: 'Extracts insights' },
                { name: 'Summarization Agent', icon: '📝', desc: 'Creates reports' },
                { name: 'Citation Agent', icon: '📚', desc: 'Formats references' }
              ].map((agent, i) => (
                <div key={i} style={{
                  padding: '1.5rem',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{agent.icon}</div>
                  <div style={{
                    color: 'var(--text-bright)',
                    fontWeight: '600',
                    marginBottom: '0.25rem'
                  }}>
                    {agent.name}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {agent.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        input:focus,
        select:focus,
        textarea:focus {
          outline: none !important;
          border-color: var(--orange) !important;
        }
      `}</style>
    </div>
  );
}

