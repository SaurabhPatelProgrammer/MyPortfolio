export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      percent += Math.round(Math.random() * 5);
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent += Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) clearInterval(interval);
      }, 350);
    }
  }, 100);

  const loaded = () =>
    new Promise<void>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve();
          clearInterval(interval);
        }
      }, 2);
    });

  const cancel = () => clearInterval(interval);

  return { loaded, cancel };
};
