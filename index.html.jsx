import React, { useState } from 'react';

const MethodologyDiagram = () => {
  const [selectedPipeline, setSelectedPipeline] = useState(null);

  const pipelineDetails = {
    advice: {
      title: "ADVICE-SEEKING Pipeline",
      example: '"Should I invest in index funds for retirement?"',
      color: "#22c55e",
      steps: [
        {
          name: "Query2Doc Expansion",
          tech: "LLM (GPT-4/Llama-3)",
          detail: "Generate pseudo-document with relevant financial knowledge"
        },
        {
          name: "Hybrid Retrieval",
          tech: "BM25 + E5-base + RRF",
          detail: "Top-100 from each, merge with Reciprocal Rank Fusion"
        },
        {
          name: "Argument Quality Scoring",
          tech: "Custom scorer",
          detail: "Discourse markers: 'because', 'therefore', 'for example'\nEvidence detection: numerical data, citations\nPersonal experience: first-person markers"
        },
        {
          name: "Cross-Encoder Re-rank",
          tech: "BGE-reranker-base",
          detail: "Final = λ₁·CE + λ₂·ArgQuality + λ₃·DiscourseScore"
        }
      ]
    },
    comparison: {
      title: "COMPARISON Pipeline",
      example: '"What is the difference between ETFs and mutual funds?"',
      color: "#f59e0b",
      steps: [
        {
          name: "Entity Extraction",
          tech: "SpaCy + regex patterns",
          detail: "Extract Entity_A='ETF', Entity_B='mutual fund' from 'X vs Y' patterns"
        },
        {
          name: "Dual-Entity Retrieval",
          tech: "Boolean + Dense filtering",
          detail: "Query AND Entity_A AND Entity_B\nHard constraint: document MUST mention both"
        },
        {
          name: "Comparative Structure Scoring",
          tech: "Custom financial scorer",
          detail: "Coverage balance: min(A,B)/max(A,B)\nComparative language: 'better than', 'whereas'\nAspect coverage: fees, risk, returns, liquidity, tax"
        },
        {
          name: "Cross-Encoder Re-rank",
          tech: "BGE-reranker + constraints",
          detail: "Reject docs missing either entity"
        }
      ]
    },
    factual: {
      title: "FACTUAL Pipeline",
      example: '"What is a Roth IRA?"',
      color: "#3b82f6",
      steps: [
        {
          name: "Entity-Centric Query",
          tech: "NER + pattern matching",
          detail: "Extract main entity: 'Roth IRA'\nExpand: 'Roth IRA definition explanation'"
        },
        {
          name: "ColBERT Retrieval",
          tech: "ColBERTv2 / RAGatouille",
          detail: "Late interaction preserves term-level matching\nBetter for specific financial terms"
        },
        {
          name: "Definition Pattern Scoring",
          tech: "Regex + dependency parse",
          detail: "Patterns: 'X is a...', 'X refers to...', 'X means...'\nEntity prominence: early position = higher score"
        },
        {
          name: "RAG-Ready Output",
          tech: "Extractive preparation",
          detail: "Extract definitional sentences for downstream QA"
        }
      ]
    },
    explanation: {
      title: "EXPLANATION Pipeline",
      example: '"Why do stock prices drop after earnings?"',
      color: "#ec4899",
      steps: [
        {
          name: "HyDE Expansion",
          tech: "LLM hypothesis generation",
          detail: "Generate: 'Stock prices drop after earnings because...'\nUse embedding of hypothesis for retrieval"
        },
        {
          name: "Dense Retrieval",
          tech: "E5-large embeddings",
          detail: "Encode HyDE document, retrieve similar passages"
        },
        {
          name: "Causal Pattern Scoring",
          tech: "Discourse relation mining",
          detail: "Markers: 'because', 'due to', 'caused by', 'leads to'\nChain depth: A→B→C multi-step reasoning"
        },
        {
          name: "Cross-Encoder Re-rank",
          tech: "BGE-reranker + causal score",
          detail: "Prioritize documents with complete causal explanations"
        }
      ]
    }
  };

  const PipelineBox = ({ id, title, color, isSelected, onClick }) => (
    <div 
      onClick={() => onClick(id)}
      className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
        isSelected 
          ? 'shadow-lg scale-105' 
          : 'hover:shadow-md hover:scale-102'
      }`}
      style={{ 
        borderColor: color, 
        backgroundColor: isSelected ? `${color}15` : 'white' 
      }}
    >
      <div className="font-bold text-center" style={{ color }}>
        {title}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Intent-Aware Retrieval for Financial QA
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Click on any pipeline to see details
        </p>

        {/* Main Diagram */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Input */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4 text-center max-w-md">
              <div className="text-sm text-blue-600 font-semibold">📥 INPUT</div>
              <div className="text-gray-700 mt-1">User Query</div>
              <div className="text-xs text-gray-500 italic mt-1">
                "Should I invest in ETFs or mutual funds?"
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-4">
            <svg className="w-6 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          {/* Intent Classifier */}
          <div className="flex justify-center mb-6">
            <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-4 text-center">
              <div className="text-sm text-orange-600 font-semibold">🎯 INTENT CLASSIFIER</div>
              <div className="text-gray-700 mt-1">DistilBERT fine-tuned</div>
              <div className="text-xs text-gray-500">LLM-annotated FiQA queries (~650 samples)</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-4">
            <svg className="w-6 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          {/* Pipelines Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <PipelineBox 
              id="advice" 
              title="💡 ADVICE" 
              color="#22c55e"
              isSelected={selectedPipeline === 'advice'}
              onClick={setSelectedPipeline}
            />
            <PipelineBox 
              id="comparison" 
              title="⚖️ COMPARISON" 
              color="#f59e0b"
              isSelected={selectedPipeline === 'comparison'}
              onClick={setSelectedPipeline}
            />
            <PipelineBox 
              id="factual" 
              title="📖 FACTUAL" 
              color="#3b82f6"
              isSelected={selectedPipeline === 'factual'}
              onClick={setSelectedPipeline}
            />
            <PipelineBox 
              id="explanation" 
              title="❓ EXPLANATION" 
              color="#ec4899"
              isSelected={selectedPipeline === 'explanation'}
              onClick={setSelectedPipeline}
            />
          </div>

          {/* Selected Pipeline Details */}
          {selectedPipeline && (
            <div 
              className="rounded-lg p-6 mb-6 transition-all duration-300"
              style={{ 
                backgroundColor: `${pipelineDetails[selectedPipeline].color}10`,
                borderLeft: `4px solid ${pipelineDetails[selectedPipeline].color}`
              }}
            >
              <h3 
                className="font-bold text-lg mb-2"
                style={{ color: pipelineDetails[selectedPipeline].color }}
              >
                {pipelineDetails[selectedPipeline].title}
              </h3>
              <p className="text-gray-600 italic text-sm mb-4">
                Example: {pipelineDetails[selectedPipeline].example}
              </p>
              
              <div className="space-y-3">
                {pipelineDetails[selectedPipeline].steps.map((step, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                        style={{ backgroundColor: pipelineDetails[selectedPipeline].color }}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{step.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{step.tech}</div>
                        <div className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Arrow */}
          <div className="flex justify-center mb-4">
            <svg className="w-6 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          {/* Output */}
          <div className="flex justify-center">
            <div className="bg-indigo-50 border-2 border-indigo-400 rounded-lg p-4 text-center max-w-md">
              <div className="text-sm text-indigo-600 font-semibold">📤 OUTPUT</div>
              <div className="text-gray-700 mt-1">Ranked Results</div>
              <div className="text-xs text-gray-500">
                Top-K documents optimized for query intent
              </div>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Summary: Intent-Specific Ranking Signals
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3">Intent</th>
                  <th className="text-left py-2 px-3">Primary Signal</th>
                  <th className="text-left py-2 px-3">Secondary Signals</th>
                  <th className="text-left py-2 px-3">Key Tech</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-semibold text-green-600">ADVICE</td>
                  <td className="py-2 px-3">Argument Quality</td>
                  <td className="py-2 px-3 text-gray-600">Discourse markers, Evidence presence</td>
                  <td className="py-2 px-3 font-mono text-xs">Query2Doc + CrossEncoder</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-semibold text-amber-600">COMPARISON</td>
                  <td className="py-2 px-3">Dual-entity coverage</td>
                  <td className="py-2 px-3 text-gray-600">Comparative language, Aspect coverage</td>
                  <td className="py-2 px-3 font-mono text-xs">Entity filtering + Custom</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-semibold text-blue-600">FACTUAL</td>
                  <td className="py-2 px-3">Definition pattern</td>
                  <td className="py-2 px-3 text-gray-600">Entity prominence</td>
                  <td className="py-2 px-3 font-mono text-xs">ColBERT + Patterns</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-pink-600">EXPLANATION</td>
                  <td className="py-2 px-3">Causal markers</td>
                  <td className="py-2 px-3 text-gray-600">Reasoning chain depth</td>
                  <td className="py-2 px-3 font-mono text-xs">HyDE + Causal detection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyDiagram;
