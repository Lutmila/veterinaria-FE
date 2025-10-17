import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ConfirmationModal = ({ openModal, closeModal, children, textAcept, textCancel, actionAcept, actionCancel }) => {
    return (
        <Dialog
            open={openModal}
            onClose={closeModal}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                ¿Estás seguro que deseas eliminar a la mascota?
            </DialogTitle>
            <DialogContent>
               {children}
            </DialogContent>
            <DialogActions sx={{ padding: '16px 24px' }}>
                <Button
                    onClick={actionCancel}
                    color="inherit"
                    variant="outlined"
                    sx={{ marginRight: '8px' }}
                >
                    {textCancel}
                </Button>
                <Button
                    onClick={actionAcept}
                    color="primary"
                    variant="contained"
                >
                    {textAcept}
                </Button>
            </DialogActions>
        </Dialog>
    );

}



export default ConfirmationModal;