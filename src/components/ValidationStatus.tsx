// src/components/ValidationStatus.tsx
import React from 'react';

const ValidationStatus = ({ isValid }: { isValid: boolean }) => {
  return (
    <div className={`validation-status ${isValid ? 'dag-valid' : 'dag-invalid'}`}>
      {isValid ? '✅ Valid DAG' : '❌ Invalid DAG'}
    </div>
  );
};

export default ValidationStatus;
