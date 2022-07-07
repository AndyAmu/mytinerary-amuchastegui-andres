


<Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', color: 'black', fontSize: '1.4rem', }}>
    <Box>
        <Avatar sx={{ marginLeft: '2rem', marginRight: '3rem' }} alt="Remy Sharp" src="https://i1.sndcdn.com/avatars-0g1trKyC7MW1vTnr-wHt9NA-t240x240.jpg" />{/* Avatar perfil */}
    </Box>
    <Box>
        <FormControl sx={{ width: '25ch' }}>
            <OutlinedInput placeholder="Please enter text" />

        </FormControl>
        <Button sx={{ color: 'white', backgroundColor: 'black', marginLeft: '2rem' }} variant="contained" endIcon={<SendIcon />}>
            Send
        </Button>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
        </Button>
    </Box>
</Box>