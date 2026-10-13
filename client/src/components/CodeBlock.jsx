import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Box, Button } from '@mui/material';

export function CodeBlock({ code, language = 'jsx', maxHeight = 560 }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* el navegador no permitió copiar */
    }
  };

  return (
    <Box sx={{ position: 'relative', bgcolor: '#011627' }}>
      <Button
        size="small"
        onClick={copy}
        sx={{
          position: 'absolute', top: 8, right: 16, zIndex: 1,
          color: 'grey.300', bgcolor: 'rgba(255,255,255,.08)',
          '&:hover': { bgcolor: 'rgba(255,255,255,.16)' },
        }}
      >
        {copied ? '¡Copiado!' : 'Copiar'}
      </Button>
      <Highlight theme={themes.nightOwl} code={code.trimEnd()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <Box
            component="pre"
            style={style}
            sx={{
              m: 0, p: 2, pr: 10, overflow: 'auto', maxHeight,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 13, lineHeight: 1.65,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <Box component="span" sx={{ display: 'inline-block', width: 36, opacity: 0.35, userSelect: 'none' }}>
                  {i + 1}
                </Box>
                {line.map((token, k) => (
                  <span key={k} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </Box>
        )}
      </Highlight>
    </Box>
  );
}
