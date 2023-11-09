import { useRef, useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { Input, Button } from '@rneui/themed'
import {
    useCreateUserMutation,
    useUpdateUserMutation
} from '../../store/api/usersApi'
import { useToast } from 'react-native-toast-notifications'

export const UserForm = ({ route, navigation }) => {
    const lastNameRef = useRef(null)
    const [id, setId] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
    const toast = useToast()

    useEffect(() => {
        if (route.params?.user) {
            const { user } = route.params
            setId(user.id)
            setFirstName(user.firstName)
            setLastName(user.lastName)
        }
    }, [route.params])

    const handleSubmit = () => {
        if (firstName === '' || lastName === '') {
            toast.show('Please fill out all inputs', {
                type: 'warning',
                placement: 'top',
                duration: 4000,
                animationType: 'slide-in'
            })
            return
        }

        if (id) {
            // Update existing user
            updateUser({
                user: { id: id, firstName: firstName, lastName: lastName }
            })
                .then(() => {
                    navigation.navigate('UserList')
                    toast.show(
                        `Användaren ${firstName} ${lastName} har uppdaterats!`,
                        {
                            type: 'success',
                            placement: 'top',
                            duration: 4000,
                            animationType: 'slide-in'
                        }
                    )
                })
                .catch((error) => {
                    toast.show(error, { type: 'danger' })
                })
        } else {
            // Create new user
            createUser({ user: { firstName: firstName, lastName: lastName } })
                .then(() => {
                    navigation.navigate('UserList')
                    toast.show(
                        `Användaren ${firstName} ${lastName} har skapats!`,
                        {
                            type: 'success',
                            placement: 'top',
                            duration: 4000,
                            animationType: 'slide-in'
                        }
                    )
                    setFirstName('')
                    setLastName('')
                })
                .catch((error) => {
                    toast.show(error, { type: 'danger' })
                })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.parentContainer}>
                <View style={styles.container}>
                    <Text>{id ? 'Update your user' : 'Create your user'}</Text>
                    <Input
                        returnKeyType="next"
                        onSubmitEditing={() => lastNameRef.current.focus()}
                        blurOnSubmit={false}
                        value={firstName}
                        disabled={isCreating || isUpdating}
                        onChangeText={(text) => setFirstName(text)}
                        placeholder="First name"
                    />
                    <Input
                        ref={lastNameRef}
                        value={lastName}
                        disabled={isCreating || isUpdating}
                        returnKeyType="send"
                        onSubmitEditing={() => handleSubmit()}
                        onChangeText={(text) => setLastName(text)}
                        placeholder="Last name"
                    />
                    <Button
                        title={id ? 'Update user' : 'Create user'}
                        disabled={isCreating || isUpdating}
                        loading={isCreating || isUpdating}
                        onPress={() => handleSubmit()}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 16
    },
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center'
    }
})
