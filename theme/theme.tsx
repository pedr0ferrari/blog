import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    amarelo: {
      420: "#E2E395",
      421: "#E2E396",
    },
    bege: {
      420: "#F5F5D8",
      421: "#F5F5D9",
    },
    preto: {
      420: "#0A0A0A",
      421: "#0A0A1A",
    },
  },
  fonts: {
    body: "Roboto Mono",
  },
  components: {
    Button: {
      variants: {
        headerBtn: {
          color: "#0A0A0A",
          bgColor: "#F5F5D8",
        },
      },
      baseStyle: {
        fontWeight: "bold",
      },
    },
  },
});

export default theme;
