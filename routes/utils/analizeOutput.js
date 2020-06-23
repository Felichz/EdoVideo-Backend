function analizeOutput(output) {
    if (output) {
        if (output.matchedCount > 0) {
            if (output.modifiedCount === 0) {
                return 'Match without modifications';
            } else {
                return 'Match with modifications';
            }
        } else {
            return 'No match';
        }
    }
}

module.exports = analizeOutput;
