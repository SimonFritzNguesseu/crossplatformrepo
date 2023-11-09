/*import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import { useCreatePostMutation } from '../../store/api/postsApi'

const PostForm = ({ loggedInAs }) => {
    const [postText, setPostText] = useState('')
    const [createPost, { isLoading }] = useCreatePostMutation()

    const handleCreatePost = async () => {
        if (postText.trim().length === 0) {
            // Hantera tomt inlägg, visa eventuellt ett felmeddelande
            return
        }

        try {
            await createPost({
                text: postText,
                createdBy: loggedInAs.id,
                createdDate: new Date().toLocaleDateString()
            })
            setPostText('') // Rensa textfältet efter inlägget har skapats
        } catch (error) {
            // Hantera eventuella fel här
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Posta något intressant..."
                        value={postText}
                        onChangeText={setPostText}
                        multiline
                    />
                    <Button
                        title="Skapa inlägg"
                        onPress={handleCreatePost}
                        disabled={isLoading}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 10
    }
})

export default PostForm*/
