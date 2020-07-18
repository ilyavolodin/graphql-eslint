const namingConvention = require('./naming-convention');
const requireDeprecationReason = require('./require-deprecation-reason');
const requireDescription = require('./require-description');
const descriptionStyle = require('./description-style');
const inputName = require('./input-name');
const prettier = require('./prettier');

module.exports = {
    'naming-convention': namingConvention,
    'require-deprecation-reason': requireDeprecationReason,
    'require-description': requireDescription,
    'description-style': descriptionStyle,
    'input-name': inputName,
    prettier
};
