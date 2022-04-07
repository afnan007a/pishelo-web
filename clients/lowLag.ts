import smoothfade from "smoothfade";
import { logIt } from "@/clients/index";

let windowobject;
let initialized = false;
export function init(window):boolean {
  if (!window) return false;
  windowobject = window;
  const lowLag = windowobject.lowLag;
  lowLag.init();
  initialized = true;
  logIt("Initialized LowLag Audio Engine", {
    source: "audioEngine_init",
    raw: {
      window: window,
      lowLag: window.lowLag,
      windowbj: windowobject,
    },
  });
  return true;
}

const awaitingforload: string[] = [];
const audioincache: any = {};
export async function loadAudio(id, { src }): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    if (!id || !src) reject(false);
    if (!initialized) {
      logIt(
        `Failed to play audio because audio engine has not been initialized`,
        {
          source: "audioEngine_loadAudio",
          raw: { id, src, initialized },
          level: "error",
        }
      );
      return;
    }
    logIt(`Loading Audio with id "${id}" from "${src}"`, {
      source: "audioEngine_loadAudio",
      raw: { id, src },
    });
    const lowLag = windowobject.lowLag;
    await lowLag.load(src, id);
    audioincache[id] = {
      src: src,
    };
    logIt(
      `Successfully loaded Audio and added to cache with id "${id}" from "${src}"`,
      {
        source: "audioEngine_loadAudio",
        raw: { id, src },
      }
    );

    // Check for retries of playing this audio
    const audiowaitedtoload = awaitingforload.find(
      (waitingaudioid) => waitingaudioid == id
    );
    if (audiowaitedtoload) {
      const indexofaudio = awaitingforload.findIndex(
        (waitingaudioid) => waitingaudioid == id
      );
      logIt(
        `Audio is waiting to play with id "${id}" from "${src}", now playing since loading is complete.`,
        {
          source: "audioEngine_retryAfterLoadAudio",
          raw: { id, src },
        }
      );
      playAudio(id, { retryAfter: false })
      delete awaitingforload[indexofaudio];
    }
    resolve(true);
  });
}

interface AudioData {
  id: string;
  source: AudioBufferSourceNode;
  audioContext: AudioContext;
  audioBuffer: AudioBuffer;
  gainNode: GainNode;
  sm: {
    fadeIn: Function;
    fadeOut: Function;
  };
  volume: Function;
  setVolume: Function;
}
const allplayedaudios: AudioData[] = [];
const currentlyplayingaudios: AudioData[] = [];

export function playAudio(id, { retryAfter = true }): AudioData | null {
  if (!id) return null;
  const lowLag = windowobject.lowLag;
  if (!audioincache[id]) {
    logIt(
      `Audio failed to play becuase it does not exist in cache with id "${id}". Will try to play again after loaded if retryAfter is enabled.`,
      {
        source: "audioEngine_playAudio",
        level: "error",
        raw: { id, audiocache: audioincache, retryAfter },
      }
    );

    if (retryAfter) {
      awaitingforload.push(id)
    }
    
    return null;
  }
  logIt(`Attempting to play audio with id "${id}"`, {
    source: "audioEngine_playAudio",
    raw: { id, audiocache: audioincache },
  });
  const { source, audioContext, gainNode, audioBuffer }: AudioData = lowLag.play(id);
  logIt(`Playing audio with id "${id}"`, {
    source: "audioEngine_playAudio",
    raw: { id, audiocache: audioincache },
  });

  const smoptions = {
    type: "linear",
    fadeLength: 0.5,
  };
  var sm = smoothfade(audioContext, gainNode, smoptions);
  logIt(`Successfully applied smoothfade configuration to audioContext.`, {
    source: "audioEngine_playAudio",
    raw: { smoothfade_options: smoptions },
  });

  const data: AudioData = {
    id: id,
    source,
    audioContext,
    audioBuffer,
    gainNode,
    sm: {
      fadeIn: (volume) => {
        let finalvol = Number(volume.toFixed(1));
        if (finalvol > 1) {
          finalvol = 1;
        } else if (0 > finalvol) {
          finalvol = 0;
        }
        logIt(`Attempting to fadeIn audio with id "${id}" to "${finalvol}"`, {
          source: "audioEngine_audio_fadeIn",
          raw: { id, volumeTo: finalvol },
        });
        sm.fadeIn({
          targetValue: finalvol,
        });
        return finalvol * 100;
      },
      fadeOut: (volume) => {
        let finalvol = Number(volume.toFixed(1));
        if (finalvol > 1) {
          finalvol = 1;
        } else if (0 > finalvol) {
          finalvol = 0;
        }
        logIt(`Attempting to fadeOut audio with id "${id}" to "${finalvol}"`, {
          source: "audioEngine_audio_fadeOut",
          raw: { id, volumeTo: finalvol },
        });
        sm.fadeOut({
          targetValue: finalvol,
        });
        return finalvol * 100;
      },
    },
    volume: () => {
      return gainNode.gain.value;
    },
    setVolume: (volume: number) => {
      let finalvol = Number(volume.toFixed(1));
      if (finalvol > 1) {
        finalvol = 1;
      } else if (0 > finalvol) {
        finalvol = 0;
      }
      logIt(`Attempting to set audio volume with id "${id}" to "${finalvol}"`, {
        source: "audioEngine_audio_setVolume",
        raw: { id, volumeTo: finalvol },
      });
      gainNode.gain.value = finalvol;
      return finalvol * 100;
    },
  };
  currentlyplayingaudios.push(data);
  allplayedaudios.push(data);

  source.addEventListener('ended', () => {
    let theaudioindex = currentlyplayingaudios.findIndex(
      (audiodata) => audiodata?.id || '0' == id
    );
    delete currentlyplayingaudios[theaudioindex];
  })
  logIt(`Added AudioContext to audioplaying cache`, {
    source: "audioEngine_playAudio",
    raw: { data: data },
  });
  return data;
}

export function getContext(): AudioContext {
  const lowLag = windowobject.lowLag;
  return lowLag.audioContext;
}

export function getAudio(id): AudioData | null {
  if (!id) return null
  const selectedinarray = currentlyplayingaudios.find(
    (audio) => audio.id == id
  );
  if (!selectedinarray) return null;

  return selectedinarray;
}

export function stopAudio(id): boolean {
  if (!id) return false;
  const selectedinarray = currentlyplayingaudios.find(
    (audio) => audio.id == id
  );
  if (!selectedinarray) return false;

  selectedinarray.source.stop();
  return true;
}

export function setGlobalVolume(volume, { withEase = false, fadeType = 'fadeIn' }:{ withEase?: boolean; fadeType?: 'fadeIn' | 'fadeOut' }): boolean {

  const finalvolume = Number(volume.toFixed(1));
  logIt(`Attempting to set global audio volume with id to "${finalvolume}"`, {
    source: "audioEngine_audio_setVolume",
    raw: { volume, finalvolume, withEase, fadeType, currentlyplayingaudios },
  });

  currentlyplayingaudios.forEach((audio) => {
    if (!withEase) {
      audio.setVolume(finalvolume);
      return true
    }

    audio.sm[fadeType](finalvolume);
    return true
  })
  return true;
}

export function getGlobalVolume(): number {
    const allvolumes = currentlyplayingaudios.reduce(
      (partialSum, audio) => {
        return partialSum + audio.volume()
      },
      0
    );
    const actualcurrentlyplayingaudios = currentlyplayingaudios.reduce(
      (partialSum, audio) => {
        if (audio) {
          return partialSum + 1
        } else {
          return partialSum
        }
      },
      0
    );
    const avgvolume = Number(
      (allvolumes / actualcurrentlyplayingaudios).toFixed(1)
    );
    return avgvolume
}
