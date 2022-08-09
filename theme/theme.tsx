import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "#F5F5D8",
      },
    },
  },
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
        mainBtn: {
          color: "#0A0A0A",
          bgColor: "#E2E395",
          boxShadow: "0 0 2px rgba(0,0,0,0.5)",
          _hover: {
            boxShadow: "0 0 2px rgba(0,0,0,0.9)",
          },
        },
        headerBtn: {
          color: "#0A0A0A",
          bgColor: "#F5F5D8",
          boxShadow: "0 0 2px rgba(0,0,0,0.3)",
          _hover: {
            boxShadow: "0 0 2px rgba(0,0,0,0.8)",
          },
        },
      },
      baseStyle: {
        fontWeight: "bold",
      },
    },
  },
});

export default theme;
