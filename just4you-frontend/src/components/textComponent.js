export const TruncatedDescription = text => {
    if (text && text.length > 50) {
        text = text.substring(0, 50) + "...";
    }

    if (text && text.length > 250) {
        text = text.substring(0, 250) + "...";
    }
    return text;
};

export const TruncatedTitle = text => {
    if (text && text.length > 25) {
        text = text.substring(0, 25) + "...";
    }

    if (text && text.length > 60) {
        text = text.substring(0, 60) + "...";
    }
    return text;
};

export default [TruncatedDescription, TruncatedTitle]