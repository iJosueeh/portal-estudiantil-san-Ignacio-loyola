import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env'; // Import postcss-preset-env

export default {
  plugins: [
    tailwindcss('./tailwind.config.js'), // Explicitly pass the config file
    postcssPresetEnv({
      features: {
        'focus-within-pseudo-class': false, // Disable if causing issues
      },
    }),
    autoprefixer,
  ],
};