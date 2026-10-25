// src/index.ts
/**
 * Main entry point for ChainMosaic
 */

import { ChainMosaic } from './chainmosaic';
import minimist from 'minimist';

interface Args {
    verbose?: boolean;
    input?: string;
    output?: string;
}

const args: Args = minimist(process.argv.slice(2), {
    boolean: ['verbose'],
    alias: {
        v: 'verbose',
        i: 'input',
        o: 'output'
    }
});

async function main(): Promise<void> {
    try {
        const app = new ChainMosaic({
            verbose: args.verbose || false
        });

        if (args.verbose) {
            console.log('Starting ChainMosaic processing...');
        }

        const result = await app.execute();

        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        console.log('Processing completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
