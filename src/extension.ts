import {
  commands,
  ExtensionContext,
  workspace,
  WorkspaceConfiguration,
} from 'vscode';

type Configs = {
  editorConfig: WorkspaceConfiguration;
  terminalConfig: WorkspaceConfiguration;
  windowConfig: WorkspaceConfiguration;
};

type Fonts = {
  editorFont: string;
  terminalFont: string;
};

const targetFont = 'Comic Mono';
const targetZoomLevel = 2;

let editorConfig: WorkspaceConfiguration;
let terminalConfig: WorkspaceConfiguration;
let windowConfig: WorkspaceConfiguration;

let editorFont: string;
let terminalFont: string;
let zoomLevel: number;

export const activate = (context: ExtensionContext): void => {
  ({ editorConfig, terminalConfig, windowConfig } = getConfigs());
  ({ editorFont, terminalFont } = getFonts());
  zoomLevel = getZoomLevel();

  const enableComicMono = commands.registerCommand(
    'vs-code-comic-mono.enable',
    () => {
      enable();
    }
  );

  const disableComicMono = commands.registerCommand(
    'vs-code-comic-mono.disable',
    () => {
      disable();
    }
  );

  context.subscriptions.push(enableComicMono, disableComicMono);
};

const enable = (): void => {
  editorConfig.update('fontFamily', targetFont, false);
  terminalConfig.update('fontFamily', targetFont, false);
  windowConfig.update('zoomLevel', targetZoomLevel, false);
};

const disable = (): void => {
  editorConfig.update('fontFamily', editorFont, false);
  terminalConfig.update('fontFamily', terminalFont, false);
  windowConfig.update('zoomLevel', zoomLevel, false);
};

const getConfigs = (): Configs => {
  const editorConfig = workspace.getConfiguration('editor');
  const terminalConfig = workspace.getConfiguration('terminal.integrated');
  const windowConfig = workspace.getConfiguration('window');

  return { editorConfig, terminalConfig, windowConfig };
};

const getFonts = (): Fonts => {
  const editorFont = editorConfig.get<string>('fontFamily') || '';
  const terminalFont = terminalConfig.get<string>('fontFamily') || '';

  return { editorFont, terminalFont };
};

const getZoomLevel = (): number => {
  return windowConfig.get<number>('zoomLevel') || 0;
};
