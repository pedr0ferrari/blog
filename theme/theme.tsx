import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    amarelo: {
      420: "#E2E395",
    },
    bege: {
      420: "#F5F5D8",
    },
    preto: {
      420: "#0A0A0A",
    },
  },
  fonts: {
    body: "Roboto Mono",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
    },
  },
});

export default theme;
