import React, { useEffect, useState } from 'react';
import { UserConfig } from '../../config';
import { Link, Card, CardHeader, CardBody, Text, Box } from '@chakra-ui/react';

interface Props {
  userConfig: UserConfig;
  query: string;
}

interface OmnisearchResult {
  score: number;
  path: string;
  basename: string;
  foundWords: string[];
  matches: {
    match: string;
    offset: number;
  }[];
  excerpt: string;
}

export function OmnisearchCard(props: Props) {
  const [omnisearchResults, setOmnisearchResults] = useState<
    OmnisearchResult[] | []
  >([]);

  useEffect(() => {
    async function OmnisearchQuery(props: Props) {
      const port = props.userConfig.port;
      const token = props.userConfig.token;

      const res = await fetch(
        `http://localhost:${port}/omnisearch/?q=${props.query}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      setOmnisearchResults(json);
    }
    OmnisearchQuery(props);
  }, [props]);

  if (omnisearchResults.length === 0) {
    return null;
  }

  const filteredOmnisearchResults = omnisearchResults.slice(0, 3);
  const vaultNameEncoded = props.userConfig.vaultName;

  return (
    <Box>
      {filteredOmnisearchResults.map((result, idx) => {
        const encodedFilename = result.basename;
        const url = `obsidian://open?vault=${vaultNameEncoded}&file=${encodedFilename}`;

        return (
          <Card key={idx}>
            <CardHeader pb="0" pl="2px" pt="12px">
              <Text as="b" fontSize="2xl">
                <Link href={url} isExternal>
                  {result.basename}.md
                </Link>
              </Text>
            </CardHeader>
            <CardBody>
              <Box>
                <Text
                  mt="2px"
                  dangerouslySetInnerHTML={{ __html: result.excerpt }}
                />
              </Box>
            </CardBody>
          </Card>
        );
      })}
    </Box>
  );
}
