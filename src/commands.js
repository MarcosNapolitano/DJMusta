import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const MIAU_COMMAND = {
  name: 'miau',
  description: 'Decime Miau y Tomo!',
  type: 1,
  integration_types: [0],
  contexts: [0],
};

const SALUD_COMMAND = {
  name: 'salud',
  description: 'Salud!!!',
  type: 1,
  integration_types: [0],
  contexts: [0],
};

const CUMBIA_COMMAND = {
  name: 'cumbia',
  description: 'Qué tema querés escuchar hoy?',
  type: 1,
  integration_types: [0],
  contexts: [0],
};

const VINO_COMMAND = {
  name: 'vino',
  description: 'Qué eskabiamos hoy?',
  type: 1,
  integration_types: [0],
  contexts: [0],
};

const ALL_COMMANDS = [MIAU_COMMAND, SALUD_COMMAND, CUMBIA_COMMAND, VINO_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
