import { Box, Button, Typography } from "@mui/material";
import { ROLE } from "@/types"; // путь меняй под себя

type Props = {
  onSelect: (role: ROLE) => void;
};

export const SelectRoleStep = ({ onSelect }: Props) => {
  return (
    <Box textAlign="center">
      <Typography variant="h5" mb={4}>
        Выберите кто вы
      </Typography>

      <Box display="flex" gap={4} justifyContent="center" flexWrap="wrap">
        {/* Турист */}
        <Box display="flex" flexDirection="column" alignItems="center" maxWidth={200}>
          <Typography variant="subtitle1" mb={1}>
            Для туристов
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={2}>
            Найти лучшие предложения туров.
          </Typography>
          <Button variant="contained" onClick={() => onSelect(ROLE.TOURIST)} fullWidth>
            Я турист
          </Button>
        </Box>

        {/* Агентство */}
        <Box display="flex" flexDirection="column" alignItems="center" maxWidth={200}>
          <Typography variant="subtitle1" mb={1}>
            Для агентств
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={2}>
            Предлагать свои туры туристам.
          </Typography>
          <Button variant="contained" onClick={() => onSelect(ROLE.AGENCY)} fullWidth>
            Я агентство
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
