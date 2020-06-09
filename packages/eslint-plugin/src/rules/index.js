const namingConvention = require('./naming-convention');
const requireDeprecationReason = require('./require-deprecation-reason');
const requireDescription = require('./require-description');
const prettier = require('./prettier');

module.exports = {
    'naming-convention': namingConvention,
    'require-deprecation-reason': requireDeprecationReason,
    'require-description': requireDescription,
    prettier
};
